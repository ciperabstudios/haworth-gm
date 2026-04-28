import StaffCommand from "@commands/StaffCommand";
import { LevelService } from "./core";
import { Colors } from "../colors";
import { Player } from "@infernus/core";
import Command from "@commands/Command";


new Command({
    name: "level",
    aliases: ["nivel"],
    description: "Revisa tus estadísticas de nivel.",
    run: async ({ player, subcommand, next }) => {

        const data = LevelService.getPlayerLevelData(player);
        if (!data) return next();

        const { actual, points, totalPoints } = data;

        player.sendClientMessage(Colors.LightBlue, `Nivel ${actual}, ${points}/${totalPoints} puntos para llegar al nivel ${actual + 1}.`);

        return next();
    }
});


new StaffCommand({
    name: "checklevel",
    aliases: ["revisarnivel"],
    description: "Revisa las estadísticas de nivel de un jugador.",
    requiredFlag: "DEVELOPER",
    loggable: false,
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /checklevel <ID>");

        const targetPlayer = Player.getInstance(+subcommand[0]);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");

        const data = LevelService.getPlayerLevelData(targetPlayer);
        if (!data) return next();

        const { actual, points, totalPoints } = data;

        player.sendClientMessage(Colors.LightBlue, `[EXP de ${targetPlayer.getName().name} (${targetPlayer.id})] Nivel ${actual}, ${points}/${totalPoints} para llegar al nivel ${actual + 1}.`);

        return next();
    }
});



new StaffCommand({
    name: "addlevel",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "Agrega niveles de experiencia.",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /addlevel [ID] [Level]");

        if (!subcommand.length) {
            await LevelService.setLevel(player, player.character!.level.actual + 1);
            player.sendClientMessage(Colors.LightBlue, "Te has agregado un nivel de experiencia.");

            success();
            return next();
        }

        if (subcommand.length < 2) {
            if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado no es un valor numérico válido.");
            if (+subcommand[0] <= 0) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser mayor a cero (0).");
            if (+subcommand[0] >= 20) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser inferior a veinte (20).");

            await LevelService.setLevel(player, player.character!.level.actual + (+subcommand[0]));
            player.sendClientMessage(Colors.LightBlue, `Te has agregado ${+subcommand[0] === 1 ? "un nivel" : `${subcommand[0]} niveles`} de experiencia.`);

            success();
            return next();
        }

        const [target, levels] = subcommand;

        if (isNaN(+target)) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");
        if (isNaN(+levels)) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado no es un valor numérico válido.");
        if (+levels[0] <= 0) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser mayor a cero (0).");
        if (+levels[0] > 20) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser inferior a veinte (20).");

        const targetPlayer = Player.getInstance(+target);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "Jugador no encontrado.");

        await LevelService.setLevel(targetPlayer, targetPlayer.character!.level.actual + (+levels));
        player.sendClientMessage(Colors.LightBlue, `Le has agregado ${+levels === 1 ? 'un nivel' : `${levels} niveles`} de experiencia a ${targetPlayer.getName(true).name} (${targetPlayer.id}).`);
        targetPlayer.sendClientMessage(Colors.LightBlue, `Te han agregado ${+levels === 1 ? "un nivel" : `${levels} niveles`} de experiencia.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "removelevel",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "Remueve niveles de experiencia.",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /removelevel [ID] [Level]");

        if (!subcommand.length) {
            await LevelService.setLevel(player, player.character!.level.actual - 1);
            player.sendClientMessage(Colors.LightBlue, "Te has removido un nivel de experiencia.");

            success();
            return next();
        }

        if (subcommand.length < 2) {
            if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado no es un valor numérico válido.");
            if (+subcommand[0] >= player.character!.level.actual) return player.sendClientMessage(Colors.LightRed, "No puedes removerte todos los niveles.");
            if (+subcommand[0] <= 0) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser mayor a cero (0).");
            if (+subcommand[0] >= 20) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser inferior a veinte (20).");

            await LevelService.setLevel(player, player.character!.level.actual - (+subcommand[0]));
            player.sendClientMessage(Colors.LightBlue, `Te has removido ${+subcommand[0] === 1 ? "un nivel" : `${subcommand[0]} niveles`} de experiencia.`);

            success();
            return next();
        }

        const [target, levels] = subcommand;

        if (isNaN(+target)) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");
        if (isNaN(+levels)) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado no es un valor numérico válido.");
        if (+levels[0] <= 0) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser mayor a cero (0).");
        if (+levels[0] > 20) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser inferior a veinte (20).");
        
        const targetPlayer = Player.getInstance(+target);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "Jugador no encontrado.");
        
        if (+subcommand[0] >= targetPlayer.character!.level.actual) return player.sendClientMessage(Colors.LightRed, `No puedes removerle todos los niveles a ${targetPlayer.getName(true).name} (${targetPlayer.id}).`);

        await LevelService.setLevel(targetPlayer, targetPlayer.character!.level.actual + (+levels));
        player.sendClientMessage(Colors.LightBlue, `Le has removido ${+levels === 1 ? 'un nivel' : `${levels} niveles`} de experiencia a ${targetPlayer.getName(true).name} (${targetPlayer.id}).`);
        targetPlayer.sendClientMessage(Colors.LightBlue, `Te han removido ${+levels === 1 ? "un nivel" : `${levels} niveles`} de experiencia.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "setlevel",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "Determina un nivel de experiencia dado.",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0) || !subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /setlevel [ID] <Level>");

        if (subcommand.length < 2) {
            if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado no es un valor numérico válido.");
            if (+subcommand[0] <= 0) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser mayor a cero (0).");
            if (+subcommand[0] >= 20) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser inferior a veinte (20).");

            await LevelService.setLevel(player, +subcommand[0]);
            player.sendClientMessage(Colors.LightBlue, `Te has cambiado tu nivel de experiencia a ${subcommand[0]}.`);

            success();
            return next();
        }

        const [target, level] = subcommand;

        if (isNaN(+target)) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");
        if (isNaN(+level)) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado no es un valor numérico válido.");
        if (+level[0] <= 0) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser mayor a cero (0).");
        if (+level[0] >= 20) return player.sendClientMessage(Colors.LightRed, "El nivel ingresado tiene que ser inferior a veinte (20).");

        const targetPlayer = Player.getInstance(+target);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "Jugador no encontrado.");

        await LevelService.setLevel(targetPlayer, +level);
        player.sendClientMessage(Colors.LightBlue, `Le has cambiado el nivel de experiencia de ${targetPlayer.getName(true).name} (${targetPlayer.id}) a ${level}.`);
        targetPlayer.sendClientMessage(Colors.LightBlue, `Te han cambiado el nivel de experiencia a ${level}.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "addlevelpoints",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "Agrega puntos de experiencia.",
    run: async ({ player, subcommand, next, success }) => {
        
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /addlevelpoints [ID] <Puntos>");

        if (subcommand.length < 2) {
            if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "Los puntos ingresados no son un valor numérico válido.");
            if (+subcommand[0] <= 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser mayores a cero (0).");
            if (+subcommand[0] >= 100) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser inferiores a cien (100).");

            await LevelService.addLevelPoints(player, +subcommand[0]);
            player.sendClientMessage(Colors.LightBlue, `Te has agregado ${subcommand[0]} puntos de experiencia.`);

            success();
            return next();
        }

        const [target, points] = subcommand;

        if (isNaN(+target)) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");
        if (isNaN(+points)) return player.sendClientMessage(Colors.LightRed, "Los puntos ingresados no son un valor numérico válido.");
        if (+points[0] <= 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser mayores a cero (0).");
        if (+points[0] >= 100) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser inferiores a cien (100).");

        const targetPlayer = Player.getInstance(+target);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "Jugador no encontrado.");

        await LevelService.addLevelPoints(targetPlayer, +points);
        player.sendClientMessage(Colors.LightBlue, `Le has agregado ${+points === 1 ? "un punto" : `${points} puntos`} de experiencia a ${targetPlayer.getName(true).name} (${targetPlayer.id}).`);
        targetPlayer.sendClientMessage(Colors.LightBlue, `Te han agregado ${+points === 1 ? "un punto" : `${points} puntos`} de experiencia.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "setlevelpoints",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "Determina puntos de experiencia.",
    run: async ({ player, subcommand, next, success }) => {
        
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /setlevelpoints [ID] <Puntos>");

        if (subcommand.length < 2) {
            if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "Los puntos ingresados no son un valor numérico válido.");
            if (+subcommand[0] <= 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser mayores a cero (0).");
            if (+subcommand[0] >= 100) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser inferiores a cien (100).");

            await LevelService.setLevelPoints(player, +subcommand[0]);
            player.sendClientMessage(Colors.LightBlue, `Te has cambiado tus puntos de experiencia a ${subcommand[0]}.`);

            success();
            return next();
        }

        const [target, points] = subcommand;

        if (isNaN(+target)) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");
        if (isNaN(+points)) return player.sendClientMessage(Colors.LightRed, "Los puntos ingresados no son un valor numérico válido.");
        if (+points[0] <= 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser mayores a cero (0).");
        if (+points[0] >= 100) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser inferiores a cien (100).");

        const targetPlayer = Player.getInstance(+target);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "Jugador no encontrado.");

        await LevelService.setLevelPoints(targetPlayer, +points);
        player.sendClientMessage(Colors.LightBlue, `Le has cambiado los puntos de experiencia de ${targetPlayer.getName(true).name} (${targetPlayer.id}) a ${points}.`);
        targetPlayer.sendClientMessage(Colors.LightBlue, `Te han cambiado los puntos de experiencia a ${points}.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "removelevelpoints",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "Remueve puntos de experiencia.",
    run: async ({ player, subcommand, next, success }) => {
        
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /removelevelpoints [ID] <Puntos>");

        if (subcommand.length < 2) {
            if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "Los puntos ingresados no son un valor numérico válido.");
            if (+subcommand[0] <= 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser mayores a cero (0).");
            if (+subcommand[0] >= 100) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser inferiores a cien (100).");

            await LevelService.removeLevelPoints(player, +subcommand[0]);
            player.sendClientMessage(Colors.LightBlue, `Te has removido ${+subcommand[0] === 1 ? "un punto" : `${subcommand[0]} puntos`} de experiencia.`);

            success();
            return next();
        }

        const [target, points] = subcommand;

        if (isNaN(+target)) return player.sendClientMessage(Colors.LightRed, "ID de jugador inválida.");
        if (isNaN(+points)) return player.sendClientMessage(Colors.LightRed, "Los puntos ingresados no son un valor numérico válido.");
        if (+points[0] <= 0) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser mayores a cero (0).");
        if (+points[0] >= 100) return player.sendClientMessage(Colors.LightRed, "Los puntos de nivel ingresados tienen que ser inferiores a cien (100).");

        const targetPlayer = Player.getInstance(+target);
        if (!targetPlayer) return player.sendClientMessage(Colors.LightRed, "Jugador no encontrado.");

        await LevelService.removeLevelPoints(targetPlayer, +points);
        player.sendClientMessage(Colors.LightBlue, `Le has removido ${+points === 1 ? "un punto" : `${points} puntos`} de experiencia a ${targetPlayer.getName(true).name} (${targetPlayer.id}).`);
        targetPlayer.sendClientMessage(Colors.LightBlue, `Te han removido ${+points === 1 ? "un punto" : `${points} puntos`} de experiencia.`);

        success();
        return next();
    }
});