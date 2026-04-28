import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import Character from "@database/schemas/character";
import { jobService, type IPlayerJobData } from "./core";
import { Colors } from "@modules/server/colors";

const recordedRoute: any[] = [];

new StaffCommand({
    name: "recordpos",
    requiredFlag: "DEVELOPER",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        const { x, y, z } = player.getPos();

        const point = { 
            x: parseFloat(x.toFixed(3)), 
            y: parseFloat(y.toFixed(3)), 
            z: parseFloat(z.toFixed(3)) 
        };

        recordedRoute.push(point);

        player.sendClientMessage(-1, `Punto añadido. Total: ${recordedRoute.length}`);

        return next();
    }
});

new StaffCommand({
    name: "saveroute",
    requiredFlag: "DEVELOPER",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        console.log(JSON.stringify(recordedRoute, null, 2));
        player.sendClientMessage(-1, "Ruta impresa en consola.");

        // Limpiar array.
        recordedRoute.splice(0, recordedRoute.length);

        return next();
    }
});



new Command({
    name: "setjobdb",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const charData = await Character.findOne({ name: player.getName().name });
        if (!charData) return;

        charData.job = { jobType: "NONE", shiftsCompleted: 0 } as IPlayerJobData;
        await charData.save();

        return next();
    }
});




new Command({
    name: "getsweeperjob",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const charData = await Character.findOne({ name: player.getName().name });
        if (!charData) return;

        if (charData.job!.jobType !== "NONE") {
            // Opcional: Permitir cambio directo o exigir /renunciar antes
            return player.sendClientMessage(Colors.Red, "Ya tienes un trabajo. Usa /renunciar primero.");
        }

        charData.job!.jobType = "SWEEPER";

        await charData.save();

        player.sendClientMessage(Colors.Green, `¡Felicidades! Ahora trabajas de barrendero.`);
        player.sendClientMessage(Colors.White, `Escribe {FFFF00}/trabajar{FFFFFF} para comenzar tu turno.`);
        
        return next();
    }
});


new Command({
    name: "trabajar",
    description: "",
    run: async ({ player, subcommand, next }) => {

        await jobService.startWork(player);

        return next();
    }
});