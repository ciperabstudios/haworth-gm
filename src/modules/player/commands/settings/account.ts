import Command from "@commands/Command";
import { Dialog, DialogStylesEnum } from "@infernus/core";
import { logger } from "@logger";
import { formatDate } from "@modules/server/assets";
import { setStringColor as sSC } from "@modules/server/colors";

new Command({
  name: "account",
  description: "Revisa los datos de tu cuenta.",
  aliases: ["cuenta"],
  run: async ({ player, subcommand, next }) => {
      const account = player.account;
      if (!account) return;
      
      const userData = [

        `{85182A} ID \t{DA1E37}${account.id}`,

        ` `,

        `{5A189A} Nombre \t{9D4EDD}${account.name}`,
        `{5A189A} Verificación de correo \t{9D4EDD}${account.email_verified ? 'Realizada' : 'Pendiente'}`,
        `{5A189A} Certificación \t{9D4EDD}${account.certified ? 'Aprobada' : 'Pendiente de aprobación'}`,

        ` `,

        `{2D6A4F} Fecha de creación \t{52B788}${formatDate(+account.registrationDate)}`,
        `{2D6A4F} Última conexión \t{52B788}${formatDate(+account.lastConnection)}`,

        ` `,

        `{023E8A} Hawks disponibles (Tokens) \t{0096C7}${account.hawks}`,
        `{023E8A} Cantidad de personajes \t{0096C7}${account.charactersAmount}`,
      ];



      const UserData = [

        `${sSC("ID:", "Grey")}\t${sSC(account.id, "LightRed")}`,

        ` `,

        `${sSC("Nombre:", "Grey")}\t${sSC(account.name, "LightRed")}`,
        `${sSC("Certificación:", "Grey")}\t${sSC(account.certified ? 'Aprobada' : 'Pendiente de aprobación', "LightRed")}`,
        `${sSC("Correo:", "Grey")}\t${sSC(account.email_verified ? 'Verificado' : 'Sin verificar', "LightRed")}`,
        
        ` `,
        //`${sSC("─".repeat(20), "Grey")}`,

        `${sSC("Creado:", "Grey")}\t${sSC(formatDate(+account.registrationDate), "LightRed")}`,
        `${sSC("Última conexión:", "Grey")}\t${sSC(formatDate(+account.lastConnection), "LightRed")}`,
        

        ` `,
        //`${sSC("─".repeat(20), "Grey")}`,

        `${sSC("Hawks (Tokens):", "Grey")}\t${sSC(account.hawks, "LightRed")}`,
        `${sSC("Cantidad de personajes:", "Grey")}\t${sSC(account.charactersAmount, "LightRed")}`
    ];

    const dialog = new Dialog({

      style: DialogStylesEnum.TABLIST,
      caption: `Información de tu cuenta - ${account.name}.`,
      info: UserData.join('\n'),
      button1: "Cerrar",
    });
    
    await dialog.show(player);

    return next();
  }
});