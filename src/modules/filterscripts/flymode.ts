import { Colors } from "@modules/server/colors/constants";
import type { IFilterScript } from "@infernus/core";
import { DynamicObject, GameMode, type IDynamicObject, KeysEnum, Player, PlayerEvent, type TPos } from "@infernus/core";
import { showInfoForPlayer } from "./showInfoForPlayer";
import { logger } from "@logger";

interface IFlyModeFS extends IFilterScript {
    load(): ReturnType<IFilterScript["load"]>;
}

// Default Move Speed
const MOVE_SPEED = 100;
const ACCEL_RATE = 0.03;
const ACCEL_MODE = true;

// Players Mode
const CAMERA_MODE_NONE = 0;
const CAMERA_MODE_FLY = 1;

// Key state definitions
type MOVE_MODE = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const MOVE_FORWARD       = 1;
const MOVE_BACK          = 2;
const MOVE_LEFT          = 3;
const MOVE_RIGHT         = 4;
const MOVE_FORWARD_LEFT  = 5;
const MOVE_FORWARD_RIGHT = 6;
const MOVE_BACK_LEFT     = 7;
const MOVE_BACK_RIGHT    = 8;

// Enumeration for storing data about the player
interface INoClipEnum {
    p: TPos & {
        skinId: number;
    }
    cameraMode: number;
    flyObject: {
        id: number;
    } & IDynamicObject;
    typeMode: MOVE_MODE;
    leftRightOld: number | KeysEnum;
    upDownOld: number | KeysEnum;
    lastMove: number;
    accelMul: number;
    accelRate: number;
    maxSpeed: {
        prev: number;
        actual: number;
    }
    accel: boolean;
}

const NoClipEnum: INoClipEnum = {
    p: {
        x: 0,
        y: 0,
        z: 0,
        skinId: 1
    },
    cameraMode: CAMERA_MODE_NONE,
    flyObject: {
        id: 0,
        modelId: 0,
        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0,
    },
    typeMode: 0,
    leftRightOld: 0,
    upDownOld: 0,
    lastMove: 0,

    accelMul: 0,
    accelRate: ACCEL_RATE,
    maxSpeed: {
        prev: MOVE_SPEED,
        actual: MOVE_SPEED,
    },
    accel: ACCEL_MODE
};

export const PlayersOnFlyMode = new Map<Player, boolean>();
export const FlyModePlayerData = new Map<Player, INoClipEnum>();

// Functions

const GetMoveDirectionFromKeys = (upDown: number, leftRight: number) => {
    let direction = 0;

    // Primero, determinamos la dirección horizontal
    if (leftRight > 0) {
        direction = MOVE_RIGHT; // RIGHT (cuando upDown es 0 o cualquier otra condición no se cumple)
        if (upDown > 0) direction = MOVE_BACK_RIGHT; // RIGHT + DOWN
        if (upDown < 0) direction = MOVE_FORWARD_RIGHT; // RIGHT + UP
    } 
    
    if (leftRight < 0) {
        direction = MOVE_LEFT; // LEFT (cuando upDown es 0 o cualquier otra condición no se cumple)
        if (upDown > 0) direction = MOVE_BACK_LEFT; // LEFT + DOWN
        if (upDown < 0) direction = MOVE_FORWARD_LEFT; // LEFT + UP
    } 
    
    // Solo después de manejar leftRight se verifica upDown
    if (leftRight === 0) {
        if (upDown > 0) direction = MOVE_BACK; // DOWN
        if (upDown < 0) direction = MOVE_FORWARD; // UP
    }

    return direction as MOVE_MODE;
};


const MoveCamera = (player: Player) => {

    const NoClipData = FlyModePlayerData.get(player)!;

    const flyObj = DynamicObject.getInstance(NoClipData.flyObject.id);
    if (!flyObj) return false;

    const { x: CP_X, y: CP_Y, z: CP_Z } = flyObj.getPos();
    const { x: FV_X, y: FV_Y, z: FV_Z } = player.getCameraFrontVector();

    // Increases the acceleration multiplier the longer the key is held
    if (NoClipData.accelMul <= 1) NoClipData.accelMul += NoClipData.accelRate;

    // Determine the speed to move the camera based on the acceleration multiplier
    const speed = NoClipData.maxSpeed.actual * (NoClipData.accel ? NoClipData.accelMul : 1);

    // Calculate the cameras next position based on their current position and the direction their camera is facing
    const { x, y, z } = GetNextCameraPosition({ 
        moveMode: NoClipData.typeMode, 
        playerObjectPosition: { x: CP_X, y: CP_Y, z: CP_Z },
        playerFrontVector: { x: FV_X, y: FV_Y, z: FV_Z }
    });
    
    DynamicObject.getInstance(NoClipData.flyObject.id)?.move(x, y, z, speed);

    // Store the last time the camera was moved as now
    NoClipData.lastMove = Date.now();
    return true;
};


interface IGetNextCameraPosition {
    moveMode: MOVE_MODE;
    playerObjectPosition: TPos;
    playerFrontVector: TPos;
};

const GetNextCameraPosition = ({ moveMode, playerObjectPosition, playerFrontVector }: IGetNextCameraPosition): TPos => {
    // Calculate the cameras next position based on their current position and the direction their camera is facing
    const { x: FV_X, y: FV_Y, z: FV_Z } = playerFrontVector;
    const { x: CP_X, y: CP_Y, z: CP_Z } = playerObjectPosition;

    const OFFSET_X = FV_X * 6_000;
    const OFFSET_Y = FV_Y * 6_000;
    const OFFSET_Z = FV_Z * 6_000;

    let x, y, z;

    switch (moveMode) {
        case MOVE_FORWARD:
            x = CP_X + OFFSET_X;
            y = CP_Y + OFFSET_Y;
            z = CP_Z + OFFSET_Z;
            break;

        case MOVE_BACK:
            x = CP_X - OFFSET_X;
            y = CP_Y - OFFSET_Y;
            z = CP_Z - OFFSET_Z;
            break;

        case MOVE_LEFT:
            x = CP_X - OFFSET_Y;
            y = CP_Y + OFFSET_X;
            z = CP_Z;
            break;

        case MOVE_RIGHT:
            x = CP_X + OFFSET_Y;
            y = CP_Y - OFFSET_X;
            z = CP_Z;
            break;

        case MOVE_BACK_LEFT:
            x = CP_X + (-OFFSET_X - OFFSET_Y);
            y = CP_Y + (-OFFSET_Y + OFFSET_X);
            z = CP_Z - OFFSET_Z;
            break;

        case MOVE_BACK_RIGHT:
            x = CP_X + (-OFFSET_X + OFFSET_Y);
            y = CP_Y + (-OFFSET_Y - OFFSET_X);
            z = CP_Z - OFFSET_Z;
            break;

        case MOVE_FORWARD_LEFT:
            x = CP_X + (OFFSET_X - OFFSET_Y);
            y = CP_Y + (OFFSET_Y + OFFSET_X);
            z = CP_Z + OFFSET_Z;
            break;

        case MOVE_FORWARD_RIGHT:
            x = CP_X + (OFFSET_X + OFFSET_Y);
            y = CP_Y + (OFFSET_Y - OFFSET_X);
            z = CP_Z + OFFSET_Z;
            break;
    }

    return { x, y, z } as TPos;
};

const CreateInvisibleObject = (x: number, y: number, z: number) => {
    const InvisibleObject = new DynamicObject({ modelId: 19300, x, y, z, rx: 0, ry: 0, rz: 0 });
    InvisibleObject.create();

    return InvisibleObject;
}

export const StartFlyMode = (player: Player) => {
	// Create an invisible object for the players camera to be attached to
    const { x, y, z } = player.getPos();
    const skinId = player.getSkin();

    const InvisibleObject = CreateInvisibleObject(x, y, z);

    // Place the player in spectating mode so objects will be streamed based on camera location
    player.toggleSpectating(true);

    // Attach the players camera to the created object
    InvisibleObject.attachCamera(player);

    PlayersOnFlyMode.set(player, true);
    FlyModePlayerData.set(player, NoClipEnum);

    const playerData = FlyModePlayerData.get(player);
    if (playerData) {
        const { p } = playerData;
        
        p.x = x;
        p.y = y;
        p.z = z;
        p.skinId = skinId;

        playerData.cameraMode = CAMERA_MODE_FLY;
        playerData.flyObject.id = InvisibleObject.id;
    }

    return true;
};


export const CancelFlyMode = (player: Player) => {
    const { x, y, z, skinId } = FlyModePlayerData.get(player)!.p;

    setTimeout(() => { player.setPos(x, y, z); player.setSkin(skinId) }, 200);

    if (PlayersOnFlyMode.get(player)) PlayersOnFlyMode.delete(player);

    player.endObjectEditing();
    player.toggleSpectating(false);

    if (FlyModePlayerData.get(player)) {
        DynamicObject.getInstance(FlyModePlayerData.get(player)!.flyObject.id)?.destroy();
        FlyModePlayerData.delete(player);
    }

    return true;
};


export const FlyMode: IFlyModeFS = {
    name: "fly_mode",
    load() {
        // Callbacks
        const onPlayerConnect = PlayerEvent.onConnect(({ player, next }) => {

            PlayersOnFlyMode.set(player, false);
            FlyModePlayerData.set(player, NoClipEnum);

            return next();
        });

        const onPlayerUpdate = PlayerEvent.onUpdate(({ player, next }) => {
            const NoClipData = FlyModePlayerData.get(player);

            if (!NoClipData) return; 
        
            if (NoClipData.cameraMode !== CAMERA_MODE_FLY) return next();
        
            const { upDown, leftRight } = player.getKeys();
        
            if (NoClipData.typeMode && (Date.now() - NoClipData.lastMove > 100)) {
                // If the last move was > 100ms ago, process moving the object the players camera is attached to
                MoveCamera(player); 
            }

            if (!upDown && !leftRight) {
                // All keys have been released, stop the object the camera is attached to and reset the acceleration multiplier
                DynamicObject.getInstance(NoClipData.flyObject.id)?.stop();

                NoClipData.typeMode = 0;
                NoClipData.accelMul = 0;
            }

            NoClipData.maxSpeed.actual = !upDown && !leftRight ? 0 : NoClipData.maxSpeed.prev;
        
            // Indicates a new key has been pressed
            // Get the direction the player wants to move as indicated by the keys
            NoClipData.typeMode = GetMoveDirectionFromKeys(upDown, leftRight);
        
            // Process moving the object the players camera is attached to
            MoveCamera(player);
            return next();
        });

        // Commands
        const flyModeCmd = PlayerEvent.onCommandText("flymode", async ({ player, subcommand, next }) => {

            PlayersOnFlyMode.get(player) ? CancelFlyMode(player) : StartFlyMode(player);
        
            if (PlayersOnFlyMode.get(player)) player.sendClientMessage(Colors.LightGreen, "[FLYMODE] Puedes ajustar la velocidad con /fmspeed y /fmaccel.");
            
            return next();
        });

        const fmSpeedCmd = PlayerEvent.onCommandText("fmspeed", async ({ player, subcommand, next }) => {

            if (!subcommand.at(0) || isNaN(+subcommand[0])) return showInfoForPlayer(player, "~r~~h~[SINTAXIS] ~s~/fmspeed [velocidad] (default: 100, max: 500)", 3000);
            if (+subcommand[0] <= 0 || +subcommand[0] > 500) return player.sendClientMessage(Colors.WrongSintaxis, "La velocidad proporcionada tiene que estar entre 1 y 500.")
        
            FlyModePlayerData.get(player)!.maxSpeed.prev = +subcommand[0];
            FlyModePlayerData.get(player)!.maxSpeed.actual = +subcommand[0];

            player.sendClientMessage(Colors.LightGreen, `[FLYMODE] Máxima velocidad establecida en ${+subcommand[0]}.`);
            return next();
        });

        const fmAccelCmd = PlayerEvent.onCommandText("fmaccel", async ({ player, subcommand, next }) => {

            if (!subcommand.at(0) || isNaN(+subcommand[0])) return showInfoForPlayer(player, "~r~~h~[SINTAXIS] ~s~/fmaccel [aceleración] (default: 0.03, max: 2)", 3000);
            if (+subcommand[0] <= 0 || +subcommand[0] > 2) return player.sendClientMessage(Colors.WrongSintaxis, "La aceleración proporcionada tiene que estar entre 0.01 y 2.");
        
            FlyModePlayerData.get(player)!.accelRate = +subcommand[0];
        
            player.sendClientMessage(Colors.LightGreen, `[FLYMODE] Máxima aceleración establecida en ${+subcommand[0]}.`);
            return next();
        });

        const offs = [
            onPlayerConnect,
            onPlayerUpdate,
            flyModeCmd,
            fmSpeedCmd,
            fmAccelCmd,
        ];

        logger.info("[FS] Flymode loaded.");

        return offs;
    },
    unload() {
        PlayersOnFlyMode.clear();
        [...FlyModePlayerData.values()].forEach((o) => {
            const obj = DynamicObject.getInstance(o.flyObject.id);

            if (obj?.isValid()) obj.destroy();
        });

        logger.info("[FS] Flymode unloaded.");
    }
};

GameMode.use(FlyMode);