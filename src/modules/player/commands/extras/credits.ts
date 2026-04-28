import Command from "@commands/Command";
import { Dialog, DialogStylesEnum } from "@infernus/core";

new Command({
  name: "creditos",
  aliases: ["credits"],
  description: "Creditos del proyecto",
  run: async ({ player, subcommand, next }) => {

    const creditsMsg = `{C3C3C3}Agradecimientos a {FF6359}dockfries{C3C3C3} por su dedicación en el desarrollo del marco de trabajo utilizado como cimiento del proyecto.\nWomen chengxin ganxie {FF6359}dockfries{C3C3C3} zai ben xiangmu zhong dui suoyong ruanjian kuangjia kaifa de chixu nuli.\n\nAgradecimientos a {FF6359}L7{C3C3C3}, la {FF6359}Carpincho Crew{C3C3C3} y a todos los {FF6359}insiders{C3C3C3} y {FF6359}miembros de la administración{C3C3C3} por\nlos aportes realizados durante toda la etapa de desarrollo inicial. Sin ellos, el proyecto no hubiese existido.\n\nHaworth Roleplay es un servidor creado por {FF6359}Ciperab Studios{C3C3C3}.`;

    const dialog = new Dialog({
      style: DialogStylesEnum.MSGBOX,
      caption: "Haworth Roleplay - Ciperab Studios",
      info: creditsMsg,
      button1: "Cerrar"
    });

    await dialog.show(player);

    return next();
  }
});