//import { BaseVehicle } from "@/modules";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onUpdate(async ({ player, next }) => {

    

    /* if (player.isInAnyVehicle() && !player.getVehicleSeat()) {
        const veh = player.getVehicle() as BaseVehicle;
        const veh_health = veh.getHealth().health;


        // https://www.open.mp/docs/scripting/resources/vehiclehealth
        const BLACK_SMOKE_HEALTH = 390;

        // Inutilizar vehículo si ya humea negro.
        //if (veh_health < BLACK_SMOKE_HEALTH) veh.broken = true;
        //if (veh.isBroken()) veh.toggleEngine(false);

        // Esta forma hace que fixear el auto con hacks no sirva.
        if (veh_health < BLACK_SMOKE_HEALTH) {
            //veh.broken = true;
            veh.toggleEngine(false);
        }
        

    } */



    return next();
});