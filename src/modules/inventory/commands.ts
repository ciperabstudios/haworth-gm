import Command from "@commands/Command";
import { playerInventoryService } from "./infrastructure";
import { Dialog, DialogStylesEnum, DynamicObject, Player, type TPos } from "@infernus/core";
import type { HandOption } from "./interfaces";
import { Colors } from "@modules/server/colors";

new Command({
    name: "inventory",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const inv = playerInventoryService.get(player)!;

        const [hands, pockets] = [inv.getHands(), inv.getPockets()];

        const formattedInv = `Bolsillos\n${pockets.getAll().length > 0 ? pockets.getAll().map(p => p ? p.name : "Nada").join("\n") : 'Vacíos...'}\n\nManos\nIzquierda: ${hands.getLeft()?.name ?? "Nada"}\nDerecha: ${hands.getRight()?.name ?? "Nada"}`;

        const dialog = new Dialog({
            style: DialogStylesEnum.LIST,
            caption: "Inventario",
            info: formattedInv,
            button1: "X",
        });

        await dialog.show(player);
        //await playerInventoryService.swapHands(player);

        return next();
    }
});


new Command({
    name: "swap",
    description: "",
    run: async ({ player, subcommand, next }) => {
        await playerInventoryService.swapHands(player);

        return next();
    }
});


new Command({
    name: "guardarbol",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const hand = (subcommand[0] === "l" ? "left" : "right") as HandOption;

        await playerInventoryService.storeObjectInPocket(player, hand);
    
/*         if (!subcommand.length) return player.sendClientMessage(-1, "Uso: /guardarbol l|r");

        const hand = (subcommand[0] === "l" ? "left": "right") as HandOption;

        const inv = playerInventoryService.get(player)!;
        const hands = inv.getHands();

        if (!hands.isHandBusy(hand)) return player.sendClientMessage(-1, `No tienes nada en la mano ${hand === "left" ? 'izquierda' : 'derecha'}.`);

        inv.storeObjectInPocket(hand);
        await playerInventoryService.save(player.getName().name, inv); */

        return next();
    }
});



new Command({
    name: "obtenerbol",
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (subcommand.length < 2) return next();

        const hand = (subcommand[0] === "l" ? "left" : "right") as HandOption;

        await playerInventoryService.putPocketObjectInHand(player, +subcommand[1], hand);

        return next();
    }
});


type DroppedObjectData = TPos & { objId: string, dynObject: DynamicObject };
const droppedObjects: Map<string, DroppedObjectData> = new Map();

const getClosestDroppedObjectFromPlayer = (player: Player): DroppedObjectData | null => {
    const closestObject = [...droppedObjects.values()].find(o => player.isInRangeOfPoint(1, o.x, o.y, o.z)); 
    return closestObject ?? null;
}

const pickupDroppedObject = (objId: string) => {
    const dynObject = droppedObjects.get(objId)!.dynObject;
    
    droppedObjects.delete(objId);
    if (dynObject.isValid()) dynObject.destroy();
}

const isWeaponModel = (model: number) => {
    const WEAPON_MODELS = [
        0, 331, 333, 334, 335, 336, 337, 338, 339, 341, 321, 322, 323, 324,
		325, 326, 342, 343, 344, 0, 0, 0, 346, 347, 348, 349, 350, 351, 352,
		353, 355, 356, 372, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366,
		367, 368, 368, 371
    ];

    return WEAPON_MODELS.includes(model);
}

/*
stock IsWeaponModel(model) {
    static const g_aWeaponModels[] = {
		0, 331, 333, 334, 335, 336, 337, 338, 339, 341, 321, 322, 323, 324,
		325, 326, 342, 343, 344, 0, 0, 0, 346, 347, 348, 349, 350, 351, 352,
		353, 355, 356, 372, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366,
		367, 368, 368, 371
    };
    for (new i = 0; i < sizeof(g_aWeaponModels); i ++) if (g_aWeaponModels[i] == model) {
        return 1;
	}
	return 0;
}
*/

new Command({
    name: "soltar",
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!player.isSpawned()) return next();

        const inventory = playerInventoryService.get(player)!;
        const hands = inventory.getHands();

        const hand: HandOption = 
            hands.isHandBusy("left") && !hands.isHandBusy("right") ? "left" :
            !hands.isHandBusy("left") && hands.isHandBusy("right") ? "right" : "right";

        //const hand = (subcommand[0] === "l" ? "left" : "right") as HandOption;

        const obj = await playerInventoryService.dropObject(player, hand);
        if (!obj) return next();

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        const randomRotation = (): number => Math.random() * (45 - 5) + 5;
        // rotx = 93.7, roty = 120.0, rotz = 120.0;

        const rotation = isWeaponModel(obj.modelId)
            ? { rx: 93.7, ry: 120, rz: randomRotation() }
            : { rx: 0, ry: 0, rz: randomRotation() };

        const droppedObject = new DynamicObject({
            modelId: obj.modelId,
            x, y, z: z - 1,
            ...rotation,
            //rx: -90, ry: 0, rz: randomRotation(), 
            streamDistance: 20,
            drawDistance: 20,
            worldId: vw,
            interiorId: int,
        }).create();

        droppedObjects.set(obj.id, { objId: obj.id, x, y, z, dynObject: droppedObject });

        //const droppedObjectLabel = "Utiliza /recoger para recoger el objeto.";

        return next();
    }
});



new Command({
    name: "recoger",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const inventory = playerInventoryService.get(player)!;
        const hands = inventory.getHands();

        if (!hands.areHandsEmpty()) return player.sendClientMessage(Colors.LightRed, "Tienes las manos ocupadas.");

        const freeHand = (hands.isHandBusy("left") ? "right" : "left") as HandOption;
        
        const obj = getClosestDroppedObjectFromPlayer(player);
        if (!obj) return next();

        await playerInventoryService.grabObject(player, freeHand, obj.objId);

        pickupDroppedObject(obj.objId);

        return next();
    }
});