import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import { playerInventoryService } from "@modules/inventory";
import { objectService } from "@modules/objects";
import { itemRegistry } from "@modules/objects/registry";
import { Colors } from "@modules/server/colors";
import { phoneService } from "./core";


new StaffCommand({
    name: "createphone",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        const inv = playerInventoryService.get(player)!;
        const hands = inv.getHands();

        // TODO: Hacer que se caiga al piso si tiene ambas manos ocupadas.
        if (hands.isHandBusy("left") && hands.isHandBusy("right")) return player.sendClientMessage(-1, "Tienes ambas manos ocupadas.");
        
        const phoneEntity = await phoneService.createPhone({
            owner: player.getName().name,
            brand: "Apple",
            name: "iPhone 17 Pro",
            operatingSystemName: "iOS",
            color: "ORANGE"
        });

        if (!phoneEntity) {
            player.sendClientMessage(Colors.LightRed, "Ha ocurrido un error al intentar crear el teléfono. Contacta al equipo de desarrollo si el error persiste.");
            return next();
        }

        const phoneObject = await objectService.createObject("PHONE", {
            name: "iPhone 17 Pro",
            kind: "PHONE",
            metadata: {
                phoneId: phoneEntity.id,
                modelId: parseInt(phoneEntity.modelId),
                attachTag: "PHONE",
                size: "small"
            }
        });

        if (!hands.isHandBusy("left")) {
            playerInventoryService.grabObject(player, "left", phoneObject.id);
            return next();
        }

        if (!hands.isHandBusy("right")) {
            playerInventoryService.grabObject(player, "right", phoneObject.id);
            return next();
        }


        success();
        return next();
    }
});


new Command({
    name: "telefono",
    aliases: ["celular"],
    description: "Utiliza tu teléfono",
    run: async ({ player, subcommand, next }) => {
        const inventory = playerInventoryService.get(player);
        if (!inventory) return next();

        const hands = inventory.getHands();

        if (hands.areHandsEmpty()) {
            player.sendClientMessage(Colors.LightRed, "No tienes nada en las manos.");
            return next();
        }

        if (hands.getLeft()?.kind !== "PHONE" && hands.getRight()?.kind !== "PHONE") {
            player.sendClientMessage(Colors.LightRed, "No tienes un teléfono en las manos.");
            return next();
        }

        const phoneItem = hands.getLeft()?.kind === "PHONE" ? hands.getLeft()! : hands.getRight()!;

        const handler = itemRegistry.get("PHONE");
        if (!handler || !handler.onUse) return next();

        if (!subcommand.at(0)) {
            await handler.onUse(player, phoneItem);
            return next();
        }

        if (!["encender", "apagar"].includes(subcommand[0])) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /telefono [encender/apagar]");

        const action = subcommand[0];
        await handler.onUse(player, phoneItem, action);

        return next();
    }
});


new Command({
    name: "atender",
    aliases: ["telatender"],
    description: "Contestar una llamada entrante.",
    run: async ({ player, subcommand, next }) => {
        //const phone = phoneService.getPlayerPhone(player);
        return next();
    }
});