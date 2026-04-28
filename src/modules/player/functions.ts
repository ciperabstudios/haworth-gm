import { DynamicActor, Player, SpecialActionsEnum, type TPos } from "@infernus/core";
import { AngleBetweenPoints } from "@modules/server/functions";

export const isPlayerSwimming = (player: Player): boolean => {
    return player.getAnimationIndex() >= 1538 || player.getAnimationIndex() <= 1544;
};


// True if player is falling with a closed parachute (improve checking parachute object in the player).
export const isPlayerFalling = (player: Player): boolean => {      
    const index = player.getAnimationIndex();
    return (index >= 958 && index <= 979) || index === 1130 || index === 1195 || index === 1132;
};


export const NearbyPlayer = (radius: number, player: Player, target: Player) => {
    const { x, y, z } = target.getPos();
     
    return player.isInRangeOfPoint(radius, x, y, z) && player.getVirtualWorld() == target.getVirtualWorld();
};


export const StopPlayerAnim = (player: Player) => {

    player.setSpecialAction(SpecialActionsEnum.NONE);
    player.clearAnimations();

};


export const IsPlayerBehindPlayer = (player: Player, target: Player, diff: number = 90) => {

    const { x: x1, y: y1 } = player.getPos();

    const { x: x2, y: y2 } = target.getPos();
    let targetFacingAngle = target.getFacingAngle().angle;


    let angDiff = AngleBetweenPoints(x1, y1, x2, y2);

    if (angDiff < 0) angDiff += 360;
    if (angDiff > 360) angDiff -= 360;

    targetFacingAngle -= angDiff;

    if (targetFacingAngle > 180) targetFacingAngle -= 360;
    if (targetFacingAngle < -180) targetFacingAngle += 360;


    return Math.abs(targetFacingAngle) > diff;
};


export const MakePlayerFacePlayer = (player: Player, target: Player, opposite: boolean = false) => {

    const { x: x1, y: y1, z: z1 } = player.getPos();
    const { x: x2, y: y2, z: z2 } = target.getPos();

    let angle = AngleBetweenPoints(x2, y2, x1, y1);

    if (opposite) {
        angle += 180;
        if (angle > 360) angle -= 360;
    }

    if (angle < 0) angle += 360;
    if (angle > 360) angle -= 360;

    player.setFacingAngle(angle);
};


export const getCharacterCameraPositionFront = (character: Player | DynamicActor, distance = 5): TPos => {
    const { x, y, z } = character.getPos();
    const angle = character.getFacingAngle().angle; // grados
    const rad = (angle - 90) * (Math.PI / 180);

    return {
        x: x - Math.cos(rad) * distance,
        y: y - Math.sin(rad) * distance,
        z: z + 1.0
    };
};


export const getCharacterCameraPositionBehind = (character: Player | DynamicActor, distance = 5): TPos => {
    const { x, y, z } = character.getPos();
    const angle = character.getFacingAngle().angle; // grados
    const rad = (90 - angle) * (Math.PI / 180);

    return {
        x: x - Math.cos(rad) * distance,
        y: y - Math.sin(rad) * distance,
        z: z + 1.0
    };
};