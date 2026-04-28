import Command from "@commands/Command";
import { logger } from "@logger";
import { Dialog, DialogStylesEnum, type IDialog } from "@infernus/core";

new Command({
    name: "panel",
    description: "",
    aliases: ["settings", "configuraciones"],
    run: async ({ player, subcommand, next }) => {

      const account = player.account;
      if (!account) return;
      
      // Prototipo básico, aún sin terminar. 
      
      const SettingsData = `Categoría\tConfiguración\tDetalles\n\
        Apariencia\tVelocímetro\tPersonalizar\n\
        Apariencia\tEstilo de bolsillos\tUI/UX 2.1\n\
        Apariencia\tVer textos flotantes\tSí\n\
        Out Of Character\tCanal faccionario\tSí\n\
        Out Of Character\tAvisos administrativos\tSí\n\
        In Character\tAnuncios y noticias\tSí\n\
        In Character\tAvisos sobre tus propiedades\tSí\n\
        Jugabilidad\tAnimación al hablar\tPor defecto\n\
        Jugabilidad\tAnimación al caminar\tPor defecto\n\
        Jugabilidad\tDistancia de dibujado\tAlta\n\
        Jugabilidad\tÍconos en el radar\tProximidad\n\
        Jugabilidad\tSonido de los menúes\tSí\n\
        Jugabilidad\tTeclas de atajo\tPersonalizar\n\
      `;

      const DialogData: IDialog = {
        style: DialogStylesEnum.TABLIST_HEADERS,
        caption: `Panel de configuración (${account?.name})`,
        info: SettingsData,
        button1: "Cambiar",
        button2: "Atrás"
      };

      const SettingsDialog = new Dialog(DialogData);
      
      const { response } = await SettingsDialog.show(player);

      // TODO: Hacer funcionar la lista, renderizando lo correspondiente en cada selección. 

      if (!response) return Dialog.close(player);
  
      return next();

    }
});