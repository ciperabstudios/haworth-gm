import Command from "@commands/Command";
import { PlayerStateEnum } from "@infernus/core";
//import { BaseVehicle } from "@/modules";


/*
new Command({
    name: "repaircar",
    description: "",
    aliases: ["rcar"],
    run: async ({ player, subcommand, next }) => {

        if (player.getState() !== PlayerStateEnum.DRIVER) return player.sendClientMessage(Colors.Red, "No eres el conductor del vehículo.");

        const veh = player.getVehicle() as BaseVehicle;
    
        if (!veh) return player.sendClientMessage(Colors.Red, "* El vehículo en el que estás es inválido. Si crees que esto es un error, repórtalo con los desarrolladores.");
        
        const carHealth = veh.getHealth().health;
        
        if (carHealth < 850.0) return player.sendClientMessage(Colors.Red, "* El vehículo debe estar al menos con 850.0 de vida. Usa '/dl' para verificar el estado.");
        
        const carDamage = veh.getDamageStatus()!;
    
        veh.repair();
    
        veh.setHealth(carHealth);
    
        const { panels, doors, lights } = veh.getDamageStatus()!;
    
        if (carDamage.tires != 0) {
            const tires = VehicleUtils.encodeTires(1, 1, 1, 1);

            veh.updateDamageStatus(panels, doors, lights, tires);
        }
        return next();

    }
});
*/