import StaffCommand from "@commands/StaffCommand";
import CharacterModel from "@database/schemas/character";
import RolepointModel from "@database/schemas/rolepoint";
import User from "@database/schemas/user";
import { Dialog, DialogStylesEnum, Player } from "@infernus/core";
import { PaginatedDialog } from "@managers/PaginatedDialog";
import { Colors, redString } from "@modules/server/colors";
import { StaffChatService, StaffService } from "@modules/staff";
import moment from "moment";
import { rolepointService, type IRolepoint } from "./core";


new StaffCommand({
    name: "giverolepoint",
    aliases: ["darpdr", "darpuntorol"],
    requiredFlag: "MANAGE_ROLEPOINTS",
    loggable: false,
    description: "Premia a un jugador por su buena interpretación dándole puntos de rol.",
    syntax: "/darpdr [ID] [Cantidad] [Razón]",
    run: async ({ player, subcommand, next, success }) => {

        if (subcommand.length < 3) return StaffCommand.getSyntax("giverolepoint", player);

        const [id, amount, ...reasonArr] = subcommand;
        const reason = reasonArr.join(" ");

        const target = StaffCommand._isValidId(player, +id);
        if (!target) return next();

        if (isNaN(+amount)) return player.sendClientMessage(Colors.LightRed, "Los puntos de rol a asignar tienen que ser un valor numérico válido.");
        if (+amount < 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de rol a asignar tienen que ser mayores a cero (0).");
        if (reason.length >= 100) return player.sendClientMessage(Colors.LightRed, "La razón no puede exceder los cien (100) caracteres.");

        const staffId = player.accountId!;
        
        const rolepoint = await rolepointService.createRolepoint({
            amount: +amount,
            characterId: target.character!.ID,
            reason,
            staffId
        });

        if (!rolepoint) return player.sendClientMessage(Colors.LightRed, "Ha ocurrido un error tratando de crear el punto de rol. Contacta al equipo de desarrollo si esto persiste.");

        target.character!.pdr?.push(rolepoint.id);
        await target.character!.save();

        const amountFormatted = `${+amount === 1 ? 'un punto': `${amount} puntos`} de rol`;

        target.id === player.id
            ? StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.accountName!} (${player.id}) se dio ${amountFormatted}. Razón: ${reason}`)
            : StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.accountName!} (${player.id}) le dio ${amountFormatted} a ${target.getName(true).name} (${player.id}). Razón: ${reason}`);

        
        target.sendClientMessage(Colors.LightGreen, `Felicidades, has recibido ${amountFormatted} por el miembro de la administración ${player.accountName!}. Razón: ${reason}`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "deleterolepoint",
    aliases: ["removerolepoint", "borrarpdr", "borrarpuntorol"],
    requiredFlag: "MANAGE_ROLEPOINTS",
    loggable: true,
    description: "Borra un punto de rol a partir de su ID.",
    syntax: "/borrarpdr [ID] [Razón]",
    run: async ({ player, subcommand, next, success }) => {

        if (subcommand.length < 2) return StaffCommand.getSyntax("deleterolepoint", player);

        const [id, ...reasonArr] = subcommand;
        const reason = reasonArr.join(" ");

        const rolepoint = rolepointService.get(id);
        if (!rolepoint) return player.sendClientMessage(Colors.LightRed, "No se han encontrado puntos de rol con la ID adjuntada.");

        const deletedRolepoint = await rolepointService.deleteRolepoint(id);
        if (!deletedRolepoint) return player.sendClientMessage(Colors.LightRed, "No se han podido borrar los puntos de rol.");

        const characterId = rolepoint.characterId;
        const target = Player.getInstances().find(p => p.dbId === characterId);

        const formattedAmount = `${rolepoint.amount === 1 ? 'ha quitado un punto': `han quitado ${rolepoint.amount} puntos`} de rol`;

        if (target) target.sendClientMessage(Colors.LightRed, `El miembro de la administración ${player.accountName!} te ${formattedAmount}. Razón: ${reason}`);
        
        const formattedTarget = target 
            ? `${target.getName(true).name} (${target.id})` 
            : (await CharacterModel.findOne({ ID: rolepoint.characterId }))!.name.replace("_", " ");

        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.accountName!} (${player.id}) borró los puntos de rol con ID ${rolepoint.id} (${rolepoint.amount}) vinculados a ${formattedTarget}. Razón: ${reason}`);

        success();
        return next();
    }
});


const cachedCharacterIdsNames: Map<string, string> = new Map();
const cachedStaffIdsNames: Map<string, string> = new Map(); 


new StaffCommand({
    name: "checkrolepoint",
    aliases: ["revisarpdr", "checkrp"],
    requiredFlag: "MANAGE_ROLEPOINTS",
    loggable: false,
    description: "Revisa la información de un punto de rol específico.",
    syntax: "/revisarpdr [ID]",
    run: async ({ player, subcommand, next }) => {
        
        if (!subcommand.at(0)) return StaffCommand.getSyntax("checkrolepoint", player);

        const id = subcommand[0];
        if (isNaN(Number(id))) return player.sendClientMessage(Colors.LightRed, "La ID del punto de rol debe ser un valor numérico válido.");

        const rolepoint = await rolepointService.get(id);
        if (!rolepoint) return player.sendClientMessage(Colors.LightRed, "No se han encontrado puntos de rol con la ID adjuntada.");

        const { characterId, staffId, amount, reason, givenAt } = rolepoint.allProps;

        // Breve caché en caso de usar muchas veces el comando.
        // TODO: A futuro, estaría interesante gestionar esto mejor.
        if (!cachedCharacterIdsNames.has(characterId)) {
            const characterQuery = (await CharacterModel.findOne({ ID: characterId }))?.name.replace("_", " ") ?? "No encontrado";
            cachedCharacterIdsNames.set(characterId, characterQuery);
        }
        const characterName = cachedCharacterIdsNames.get(characterId);


        // Breve caché en caso de usar muchas veces el comando.
        // TODO: A futuro, estaría interesante gestionar esto mejor.
        if (!cachedStaffIdsNames.has(staffId)) {
            const staffUserQuery = (await User.findOne({ id: staffId }))?.name ?? "No encontrado";
            cachedStaffIdsNames.set(staffId, staffUserQuery);
        }
        const staffName = cachedStaffIdsNames.get(staffId);

        const formattedGivenAt = moment(givenAt).format("LL [a las] LT[hs.]"); // LLLL
        
        const censoredStaffId = `${staffId.slice(0, 8)}...`;
        const formattedStaffId = StaffService.hasAnyPermissionFlag(player, ["ADMINISTRATOR", "DEVELOPER"]) ? staffId : censoredStaffId;

        const info = [
            `{C3C3C3}Personaje que lo recibió: ${redString(characterName!)} (${redString(rolepoint.characterId)})`,
            `Administrador que lo otorgó: ${redString(staffName!)} (${redString(formattedStaffId)})\n`,
            `Cantidad de puntos: ${redString(amount.toString())}\n`,
            `Razón: ${redString(reason)}\n`,
            `Fecha que fue otorgado: ${redString(formattedGivenAt)}`
        ].join("\n");


        const dialog = new Dialog({
            style: DialogStylesEnum.MSGBOX,
            caption: `H. ${redString(">")} Información sobre el punto de rol ${redString(rolepoint.id)}`,
            info,
            button1: "Aceptar"
        });

        await dialog.show(player);

        return next();
    }
});



new StaffCommand({
    name: "revisarpdrs",
    aliases: ["checkrps", "checkplayerrolepoints"],
    requiredFlag: "MANAGE_ROLEPOINTS",
    description: "Lista los puntos de rol de un personaje.",
    loggable: false,
    syntax: "/revisarpdrs [ID/ID de personaje]",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return StaffCommand.getSyntax("revisarpdrs", player);
        const [id] = subcommand;

        const character = isNaN(+id) ? await CharacterModel.findOne({ ID: id }) : Player.getInstance(+id)?.character;
        if (!character) return player.sendClientMessage(Colors.LightRed, `No se encontró ningún personaje con la ID "${id}".`);

        const rps = character.pdr;
        console.log({ rps });
        if (!rps || !rps.length) return player.sendClientMessage(Colors.LightRed, "Este personaje no tiene puntos de rol.");

        const rolepoints = await RolepointModel.find({ id: { $in: rps } }).lean</* Omit<IRolepointDocument, keyof Document> */IRolepoint[]>();

        const formattedRolepoints = rolepoints
            .sort((a, b) => Number(a.id) - Number(b.id))
            .map(rp => {
                const { id, amount, characterId, staffId, reason, givenAt } = rp;

                const formattedReason = reason.length > 40 ? `${reason.slice(0, 40)}...` : reason;
                const formattedGivenAt = moment(givenAt).format("L [a las] LT[hs.]");

                //return `{C3C3C3}${redString(id)}\t${amount}\t${formattedReason}\t${redString(formattedGivenAt)}`;
                return `{C3C3C3}${id}\t{C3C3C3}${amount}\t{C3C3C3}${formattedReason}\t{C3C3C3}${formattedGivenAt}`;
            });

        // TODO: Lógica con DialogManager para revisarlos uno por uno.
        const paginatedDialog = new PaginatedDialog({
            style: "TABLIST_HEADERS",
            caption: `H. ${redString(">")} Listado de puntos de rol [${redString(character.name)}] (${redString(id)})`,
            headers: "ID\tCantidad\tRazón\tFecha de registro",
            info: formattedRolepoints,
            button1: "Aceptar",
        });

        await paginatedDialog.show(player);

        return next();
    }
});