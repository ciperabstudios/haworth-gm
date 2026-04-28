import Command from "@commands/Command";
import { Dialog, DialogStylesEnum } from "@infernus/core";
import { ClearChat } from "@modules/server/chat";
import { Colors } from "@modules/server/colors";

new Command({
    name: "faq",
    description: "Preguntas y respuestas del servidor.",
    aliases: ["pyr"],
    run: async ({ player, subcommand, next }) => {
        const DialogData = {
            style: DialogStylesEnum.LIST,
            caption: "{FF6359} FAQ",
            info: "#1 Introducción al servidor\n#2 Mis necesidades\n#3 Primeros pasos",
            button1: "Seleccionar",
            button2: "Cancelar"
        };
        const FAQDialog = new Dialog(DialogData);

        const { response, listItem } = await FAQDialog.show(player);

        if (!response) return;

        switch (listItem) {
            case 0:
                // player.sendClientMessage(Colors.Green, "|____ Comienzo en el servidor y tus primeras horas de juego ____|");
                // player.sendClientMessage(Colors.Green, "En caso de no haber subido a nivel 2, recibirás una recompensa por completar la siguiente lista de tareas no obligatorias.");
                // player.sendClientMessage(Colors.Green, "Las opciones en color gris significan 'no completado', mientras que las opciones en color verde significan 'completado'.");
                // player.sendClientMessage(Colors.Grey, "SERVIDOR: Escribe '/primerospasos");
                ClearChat(player);
                player.sendClientMessage(Colors.DarkGreen, "|____ Introducción ____|");
                player.sendClientMessage(Colors.DarkGreen, "Haworth Roleplay es un servidor que pretende imitar la vida real de la manera más realista posible.");
                player.sendClientMessage(Colors.DarkGreen, "Para ello hemos ideado un sistema de economía totalmente realista y progresivo, un entorno con diversos tipos de propiedades");
                player.sendClientMessage(Colors.DarkGreen, "tales como negocios con stock, talleres mecánicos, oficinas, empresas de reparto, empresas de taxi, concesionarios, etc.");
                player.sendClientMessage(Colors.DarkGreen, "Crea, imagina y aplica todo lo que tengas en mente.");
                break;
            case 1:
                ClearChat(player);
                player.sendClientMessage(Colors.DarkGreen, "|____ Mis necesidades ____|");
                player.sendClientMessage(Colors.DarkGreen, "Hemos ideado un sistema de necesidades y adicciones bastante dinámico.");
                player.sendClientMessage(Colors.DarkGreen, "La comida y bebida ha sido adaptada a precios de mercado realista, deberás de cumplir una necesidad tan básica como saciar");
                player.sendClientMessage(Colors.DarkGreen, "el hambre y sed de tu personaje.");
                player.sendClientMessage(Colors.DarkGreen, "La tolerancia y adicciones que tu personaje puede obtener, varia según la calidad o el tipo de droga que");
                player.sendClientMessage(Colors.DarkGreen, "se consuma, la reacción será diferente a medida que el usuario vaya logrando un aumento de la adicción.");
                player.sendClientMessage(Colors.DarkGreen, "Consumir drogas obtiene ciertas ventajas y desventajas, que también acaban variando según el aumento de");
                player.sendClientMessage(Colors.DarkGreen, "la adicción, para obtener más información consultar en el foro.");
                player.sendClientMessage(Colors.DarkGreen, "");
                player.sendClientMessage(Colors.DarkGreen, "");
                player.sendClientMessage(Colors.DarkGreen, "Consultar punto #3 para comenzar.");
                break;
            case 2:
                player.sendClientMessage(Colors.DarkGreen, "Puedes consultar esto en cualquier momento con el comando '/primerospasos'.");
                Command.callCommand(player, "primerospasos");
                break;
        }
        return next();
    } 
});