import StaffRoleModel, { PERMISSION_GROUPS, type IAdminProps, type IStaffRole, type IStaffRoleProps, type TStaffPermissionFlag } from "@database/schemas/staff";
import User from "@database/schemas/user";
import { Player } from "@infernus/core";
import { logger } from "@logger";
import { SendSplitMessage } from "@modules/server/chat";
import { Colors, setStringColor } from "@modules/server/colors";
import type { ObjectId } from "mongoose";

export class StaffRole implements IStaffRoleProps {
  name: string;
  translatedName: string;
  priority: number;
  inherits?: TStaffPermissionFlag[];
  ownPermissions: TStaffPermissionFlag[];
  totalBits: bigint; // Calculado en el constructor.

  constructor(role: Omit<IStaffRoleProps, "totalBits">) {
    this.name = role.name;
    this.translatedName = role.translatedName;
    this.priority = role.priority;
    this.inherits = role.inherits ?? [];
    this.ownPermissions = role.ownPermissions;

    // Cálculo de bits totales.
    let totalBits = 0n;
    const totalFlags = [...(role.inherits ?? []), ...role.ownPermissions];

    for (const flag of totalFlags) {
      totalBits |= PERMISSION_GROUPS[flag].bits;
    }

    this.totalBits = totalBits;
  }
}

export class StaffRoleRepository {
  private _staffRoles = new Map<number, StaffRole>();
  private _initialized = false;
  private _lastId = 0;

  private getNextId(): number {
    return this._lastId + 1;
  }

  private addRole(role: StaffRole) {
    this._staffRoles.set(this.getNextId(), role);
  }

  private removeRole(id: number) {
    this._staffRoles.delete(id);
  }

  async init(): Promise<void> {
    if (this._initialized) return;

    try {
      const staffRoles = await StaffRoleModel.find();

      for (const role of staffRoles) {
        const { name, translatedName, priority, inherits, ownPermissions } = role;

        this.addRole(
          new StaffRole({
            name,
            translatedName,
            priority,
            inherits,
            ownPermissions,
          }),
        );
      }

      logger.info(`[StaffRoleRepository] Se han cargado ${staffRoles.length} roles administrativos.`);
    } catch (error) {
      logger.error((error as Error).message);
    }

    this._initialized = true;
  }

  async create(role: StaffRole): Promise<IStaffRole> {
    this.addRole(role);

    const result = await StaffRoleModel.create({
      ...role,
      inherits: role.inherits ?? [],
      totalBits: role.totalBits.toString(),
    });

    return result;
  }

  async find(roleName: string): Promise<IStaffRole | null> {
    return StaffRoleModel.findOne({ name: roleName }).exec();
  }

  async findById(_id: ObjectId): Promise<IStaffRole | null> {
    return StaffRoleModel.findById(_id).exec();
  }

  async delete(id: number) {
    const role = this._staffRoles.get(id);
    if (!role) return;

    const roleId = await StaffRoleModel.findOne({ name: role.name });
    if (!roleId) return;

    await User.updateMany({ "admin.roleId": roleId._id }, { $set: { admin: null } });

    await StaffRoleModel.deleteOne({ _id: roleId });

    this.removeRole(id);
  }

  async assignToPlayerAccount(player: Player, role: StaffRole) {
    const account = player.account;
    if (!account) return;

    const roleId: ObjectId = (await this.find(role.name))?._id;
    if (!roleId) return;

    StaffService.setAdmin(player, { duty: false, role });

    account.admin = { duty: false, roleId: roleId };
    await account.save();
  }

  getInstance(id: number): StaffRole | undefined {
    return this._staffRoles.get(id);
  }

  getInstances(): StaffRole[] {
    return [...this._staffRoles.values()];
  }
}

export class StaffService {
  private static adminPlayers = new Map<Player, IAdminProps>();

  static setAdmin(player: Player, adminProps: IAdminProps): void {
    this.adminPlayers.set(player, adminProps);
  }

  static removeAdmin(player: Player): void {
    this.adminPlayers.delete(player);
  }

  static isDuty(player: Player): boolean {
    return this.adminPlayers.get(player)?.duty || false;
  }

  static setDuty(player: Player, state: boolean): void {
    const data = this.adminPlayers.get(player);
    if (!data) return;

    data.duty = state;
  }

  static getRole(player: Player): IStaffRoleProps | undefined {
    return this.adminPlayers.get(player)?.role;
  }

  static setRole(player: Player, role: IStaffRoleProps): void {
    const data = this.adminPlayers.get(player);
    if (!data) return;

    data.role = role;
  }

  static getRolePriority(player: Player): number | undefined {
    return this.adminPlayers.get(player)?.role.priority;
  }

  static async setRolePriority(roleName: string /*role: StaffRole*/, priority: number): Promise<void> {
    const result = await StaffRoleModel.findOneAndUpdate({ name: roleName }, { $set: { priority: priority } }, { new: true });

    if (!result) logger.error(`[StaffService] No se encontró un rol con el nombre '${roleName}'.`);
  }

  static isRoleHigher(player1: Player, player2: Player): boolean {
    const priority1 = this.getRolePriority(player1);
    const priority2 = this.getRolePriority(player2);

    if (priority1 === undefined || priority2 === undefined) return false;

    return priority1 > priority2;
  }

  static isRoleEqual(player1: Player, player2: Player): boolean {
    const priority1 = this.getRolePriority(player1);
    const priority2 = this.getRolePriority(player2);

    return priority1 === priority2;
  }

  static hasPermissionFlag(player: Player, flag: TStaffPermissionFlag): boolean {
    const role = this.adminPlayers.get(player)?.role;
    if (!role) return false;

    return !!(role.totalBits & PERMISSION_GROUPS[flag].bits);
  }

  static hasAnyPermissionFlag(player: Player, flags: TStaffPermissionFlag[]): boolean {
    const role = this.adminPlayers.get(player)?.role;
    if (!role) return false;

    for (const flag of flags) {
      if (BigInt(role.totalBits) & PERMISSION_GROUPS[flag].bits) return true;
    }

    return false;
  }

  static getPermissionsFlags(player: Player): TStaffPermissionFlag[] {
    const role = this.getRole(player);

    if (!role) return [];

    return [...(role.inherits ?? []), ...role.ownPermissions]; //.map(p => p.flag);
  }

  // TODO: Mejorar esto.
  static getOnlineAdmins(dutyOnly = false): Player[] {
    const result: Player[] = [];

    for (const [player, props] of this.adminPlayers.entries()) {
      if (!dutyOnly || props.duty) {
        result.push(player);
      }
    }

    return result;
  }

  static async getOfflineAdmins(): Promise<{ name: string; role: string }[]> {
    const allAdmins = await User.find({ admin: { $ne: null } }).populate("admin.roleId");

    const onlineIds = new Set(Player.getInstances().map(p => p.account!.id));

    return allAdmins
      .filter((user) => !onlineIds.has(user.id))
      .map((user) => ({
        name: user.name,
        role: (user.admin?.roleId as IStaffRole)?.name,
      }));
  }
}

export class StaffChatService {
  static sendAdminMessage(color: number = Colors.OrangeWhite, message: string): void {
    const onlineAdmins = StaffService.getOnlineAdmins();

    onlineAdmins.forEach((admin) => message.length > 130 ? SendSplitMessage(admin, color, message) : admin.sendClientMessage(color, message));
  }

  static sendChatMessage(player: Player, message: string): void {
    const playerRole = StaffService.getRole(player)!;
    const playerAccount = player.account!;

    const formattedMessage = `* [${setStringColor(`${playerRole.translatedName}`, "OrangeWhite", Colors.White)}] ${playerAccount.name} (${player.id}) ${message}`;

    this.sendAdminMessage(Colors.White, formattedMessage);
  }

  static sendLog(color: number = Colors.OceanBlue, message: string): void {
    this.sendAdminMessage(color, `[AVISO STAFF] ${message}`);
  }
}
