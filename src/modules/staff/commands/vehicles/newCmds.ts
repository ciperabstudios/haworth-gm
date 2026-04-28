import StaffCommand from "@commands/StaffCommand";
import { PlayerStateEnum } from "@infernus/core";
import { Colors } from "@modules/server/colors";
import { FactionVehicle, UserVehicle, vehicleService, type VehicleFuelType } from "@modules/vehicles";

new StaffCommand({
    name: "cv",
    requiredFlag: "MANAGE_VEHICLES",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "/cv <IdModelo> [Color1] [Color2] [E(lectric) | C(ombustion)]");

        const modelId = parseInt(subcommand[0]);
        const color1 = parseInt(subcommand[1]) || 0;
        const color2 = parseInt(subcommand[2]) || 0;

        const fuelArg = subcommand[3]?.toLowerCase();
        let fuelType: VehicleFuelType | undefined = undefined;
        if (fuelArg === "electric" || fuelArg === "e") fuelType = "Electric";
        if (fuelArg === 'combustion' || fuelArg === 'gas' || fuelArg === 'c') fuelType = 'Combustion';

        if (isNaN(modelId) || modelId < 400 || modelId > 611) return player.sendClientMessage(Colors.WrongSintaxis, "/cv <IdModelo> [Color1] [Color2]");

        const { x, y, z } = player.getPos();

        const vehicle = await vehicleService.createUserVehicle(player, {
            // El Boxville (498) tiene la patente invertida. La alternativa es el Boxburg (Boxville duplicado, ID 609), que la trae normal.
            modelId: modelId === 498 ? 609 : modelId, 
            color: [color1, color2],
            pos: { x: x + 2, y, z },
            fuelType
        });

        const tipoMotor = vehicle.fuelSystem.type === 'Electric' ? 'Eléctrico' : 'Combustión';

        vehicle
            ? player.sendClientMessage(Colors.Green, `Vehículo ${modelId} creado exitosamente (tipo motor: ${tipoMotor}).`)
            : player.sendClientMessage(Colors.Red, "Error al crear el vehículo.");

        return next();
    }
});



new StaffCommand({
    name: "dv",
    requiredFlag: "MANAGE_VEHICLES",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "/dv <IdVeh>");

        const gameVehId = parseInt(subcommand[0]);

        const vehicle = await vehicleService.findByGameId(gameVehId);
        if (!vehicle) return player.sendClientMessage(Colors.WrongSintaxis, "No se encontró un vehículo con la ID proporcionada.");

        await vehicleService.deleteVehicle(vehicle.vId);

        player.sendClientMessage(Colors.Yellow, `Vehículo ${vehicle.id} [DB ID: ${vehicle.vId}] eliminado permanentemente.`);

        return next();
    }
});


new StaffCommand({
    name: "parkv",
    requiredFlag: "MANAGE_VEHICLES",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        if (!player.isInAnyVehicle()) return player.sendClientMessage(Colors.WrongSintaxis, "Debes estar dentro de un vehículo.");
        if (player.getState() !== PlayerStateEnum.DRIVER) return player.sendClientMessage(Colors.Red, "Solo el piloto puede estacionar el vehículo.");

        const vehicleId = player.getVehicle()!.id;

        const vehicle = await vehicleService.findByGameId(vehicleId);
        if (!vehicle) return player.sendClientMessage(Colors.WrongSintaxis, "Ha ocurrido un error intentando estacionar. Contacta con los desarrolladores de Haworth.");

        await vehicleService.updateParkingLocation(vehicle.vId);

        player.sendClientMessage(Colors.Green, `Estacionaste el ${vehicle.name} (ID: ${vehicle.id}).`);
        return next();
    }
});



new StaffCommand({
    name: "createfvehicle",
    aliases: ["fveh"],
    requiredFlag: "MANAGE_VEHICLES",
    loggable: true,
    description: "Crea un vehículo de facción (FactionVehicle).",
    run: async ({ player, subcommand, next }) => {
        const modelId = parseInt(subcommand[0]);
        const factionId = subcommand[1] || "LSPD"; // Default testing

        if (isNaN(modelId)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /fveh [ModelID] [FactionID]");

        const { x, y, z } = player.getPos();
        const veh = await vehicleService.createFactionVehicle(factionId, {
            modelId,
            color: [0, 1], // Negro/Blanco (Policial genérico)
            pos: { x: x + 2, y, z }
        });

        player.sendClientMessage(Colors.SoftBlue, `[FactionVehicle] Creado para ${factionId}. DB ID: ${veh.vId}`);
        return next();
    }
});



// Información Técnica (/vehinfo) - TEST DE POLIMORFISMO
new StaffCommand({
    name: "vehinfo",
    requiredFlag: "MANAGE_VEHICLES",
    loggable: false,
    description: "Muestra info de debug del vehículo.",
    run: async ({ player, next }) => {
        if (!player.isInAnyVehicle()) return player.sendClientMessage(Colors.WrongSintaxis, "Sube a un vehículo.");

        const gameId = player.getVehicle()!.id;
        const customVeh = vehicleService.findByGameId(gameId);

        if (!customVeh) return player.sendClientMessage(Colors.Grey, `Vehículo temporal (ID: ${gameId}). No está en DB.`);
        
        player.sendClientMessage(Colors.White, `=== Debug Vehículo [${gameId}] ===`);
        player.sendClientMessage(Colors.White, `DB ID: ${customVeh.vId}`);
        player.sendClientMessage(Colors.White, `Clase: ${customVeh.constructor.name}`);
        
        // Verificación de tipos en tiempo de ejecución
        if (customVeh instanceof UserVehicle) {
            player.sendClientMessage(Colors.Green, `>> TIPO: Usuario`);
            player.sendClientMessage(Colors.Green, `>> Dueño: ${customVeh.owner}`);
            player.sendClientMessage(Colors.Green, `>> Locked: ${customVeh.locked}`);
        } 
        else if (customVeh instanceof FactionVehicle) {
            player.sendClientMessage(Colors.SoftBlue, `>> TIPO: Facción`);
            player.sendClientMessage(Colors.SoftBlue, `>> Facción ID: ${customVeh.factionId}`);
        }

        return next();
    }
});