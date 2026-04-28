import Command from "@commands/Command";
import { Player } from "@infernus/core";
import { ProximityDetector } from "@modules/server/chat";
import { Colors } from "@modules/server/colors";


// TODO: Si el usuario está herido/muerto, denegarle el uso de los comandos.

new Command({
    name: "me",
    description: "Detalla una acción realizada por tu personaje.",
    syntax: "/me <Acción>",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("me", player); 

        ProximityDetector({ radius: 35, player, color: `#CBA9E4`, message: `* ${player.getName(true).name} ${subcommand.join(" ")}` });

        return next();
    }
});



new Command({
    name: "do",
    description: "Detalla el entorno que te rodea.",
    syntax: "/do <Entorno>",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("do", player);

        ProximityDetector({ radius: 35, player, color: `#9EC73D`, message: `[ ${subcommand.join(" ")} ]: ${player.getName(true).name}` });

        return next();
    }
});


new Command({
    name: "b",
    description: "Habla fuera del personaje.",
    syntax: "/b <Texto>",
    aliases: ["ooc"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("b", player);

        ProximityDetector({ radius: 15.0, player, color: `#C8C8C8`, message: `(( [${player.id}] ${player.getName(true).name}: ${subcommand.join(" ")} ))` });

        return next();
    }
});



new Command({
    name: "gritar",
    description: "Haz que el personaje exprese un mensaje en forma de grito.",
    syntax: "/g <Texto>",
    aliases: ["g", "gr", "shout"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("gritar", player);

        ProximityDetector({ radius: 50.0, player, color: `#FFFFFF`, message: `${player.getName(true).name} grita: ¡${subcommand.join(" ")}!` });

        return next();
    }
});


new Command({
    name: "sayto",
    description: "Especifica para quién va dirigido el mensaje.",
    syntax: "/decira <ID> <Texto>",
    aliases: ["sayto", "decira"],
    run: async ({ player, subcommand, next }) => {

        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes usar este comando sin haber spawneado.");
        if (subcommand.length < 2) return Command.getSyntax("sayto", player);

        const [id] = subcommand;

        if (!Command.isValidId(player, +id)) return next();

        const target = Player.getInstance(+id)!;
        
        if (target === player) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes usar este comando contigo mismo.");
        
        const { x, y, z } = player.getPos();
        
        if (!target.isInRangeOfPoint(30, x, y, z)) player.sendClientMessage(Colors.WrongSintaxis, "El jugador no está cerca tuyo.");
        
        ProximityDetector({ radius: 30.0, player, color: `#FFFFFF`, message: `${player.getName(true).name} dice (a ${target.getName(true).name}): ${subcommand.slice(1).join(" ")}` });

        return next();
    }
});


new Command({
    name: "vozbaja",
    description: "Haz que el personaje exprese un mensaje en voz baja.",
    syntax: "/vozbaja <Texto>",
    aliases: ["low"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("vozbaja", player);

        ProximityDetector({ radius: 5, player, color: `#FFFFFF`, message: `${player.getName(true).name} [en voz baja]: ${subcommand.join(" ")}` });

        return next();
    }
});