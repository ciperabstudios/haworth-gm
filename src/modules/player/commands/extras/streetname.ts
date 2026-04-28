import Command from "@commands/Command";
import { Colors } from "@modules/server/colors/constants";
import { getCityName, getMapZoneName3D, getPlayerAreaZone, getPlayerStreetName } from "@modules/server/streets/functions";


new Command({
    name: "calle",
    description: "",
    aliases: ["street", "streetname", "direccion"],
    run: async ({ player, subcommand, next }) => {

        const { x, y, z } = player.getPos();

        const street = {
            name: getPlayerStreetName(player),
            zone: getMapZoneName3D(x, y, z),
            city: getCityName(x, y),
            area: getPlayerAreaZone(x, y)
        };

        //TODO: Añadir puntos cardinales y evaluar qué calles están en la dirección de cada punto.
        
        player.sendClientMessage(Colors.Green, `Dirección actual: ${street.name}, ${street.zone}, ${street.city}, ${street.area}.`);

        return next();

    }
});