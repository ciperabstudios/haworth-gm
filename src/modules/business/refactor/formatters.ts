import { getMapZoneName3D, getPlayerAreaZone, getStreetName } from "@modules/server/streets";
import type { Business } from "./domain";


export class BusinessFormatter {
    static getInteriorText(business: Business): string {
        const { x, y, z } = business.exteriorCoords;

        const zoneName = `~b~${getMapZoneName3D(x, y, z)}`;
        const result = `~w~Salida a ~n~${zoneName}.`;

        return result;
    }


    static getExteriorText(business: Business, isPlayerOwner: boolean): string {
        const { x, y, z } = business.exteriorCoords;

        const name = `~p~${business.name}`;
        const isAvailable = business.available 
                            ? `~g~En venta ~w~(~h~~h~$${business.price}~w~)~n~` 
                            : "";

        const streetAddress = `~w~${getStreetName(x, y)}, ${getPlayerAreaZone(x, y)}`;
        const zoneName = `~w~${getMapZoneName3D(x, y, z)}`;
        const propertyCheck = isPlayerOwner ? "~b~Esta es tu propiedad" : "";

        const result = `${name}~n~${isAvailable}${streetAddress}~n~${zoneName}~n~${propertyCheck}`;

        return result;
    }
}