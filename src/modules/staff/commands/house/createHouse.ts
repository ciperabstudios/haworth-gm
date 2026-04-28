import StaffCommand from "@commands/StaffCommand";
import { houseService, type CreateHouseDTO } from "@modules/house";
import { getInteriorData } from "@modules/maps";
import { Colors } from "@modules/server/colors";

new StaffCommand({
    name: "createhouse",
    requiredFlag: "MANAGE_HOUSES",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "/createhouse [Precio] [InteriorKey]");

        const price = parseInt(subcommand[0]);
        const interiorKey = subcommand[1];

        if (isNaN(price)) return player.sendClientMessage(Colors.WrongSintaxis, "El precio debe ser un número.");

        const interiorData = getInteriorData(interiorKey);
        if (!interiorData) return player.sendClientMessage(Colors.WrongSintaxis, "Key de interior inválida. Usa /interiors para ver la lista.");

        const { x, y, z } = player.getPos();

        const houseDto: CreateHouseDTO = {
            price,
            exterior: { x, y, z, int: player.getInterior(), vw: player.getVirtualWorld() },
            interiorKey
        };

        await houseService.createHouse(houseDto);

        player.sendClientMessage(Colors.Green, `Casa creada con interior '${interiorData.name}' ($${price}).`);
        return next();
    }
});