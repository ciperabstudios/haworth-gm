import Command, { type CommandSubCategory, getCommandCategoryTranslation, getCommandSubCategoryDescription } from "@commands/Command";
import { DialogManager } from "@managers/DialogManager";

function formatList(items: string[], type: "conjunction" | "disjunction" = "conjunction", locale: string = "es"): string {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
  
    const lastItem = items.pop();
    const separator = type === "conjunction" ? "y" : "o";
  
    return `${items.join(", ")} ${separator} ${lastItem}`;
  }
  
new Command({
    name: "ayuda",
    description: "Despliega el listado de comandos disponibles en el servidor.",
    aliases: ["help"],
    run: async ({ player, subcommand, next }) => {
  
      const commands = Command.getCommands().filter(command => !command.dev);
  
      const state = {
        dialogData: new Map<string, unknown>()
      };
  
      const COMMAND_TRANSLATIONS/*: Record<keyof Omit<Command, "run">, string>*/ = {
        name: "Nombre",
        category: "Categoría",
        subcategory: "Subcategoría",
        description: "Descripción",
        syntax: "Sintaxis",
        aliases: "Alias",
        dev: "Desarrollador"
      };
  
      const unvisibleKeys = ["run", "name"];
  
      const manager = new DialogManager({ player, state });
  
  
      manager.setDialogs([
          {
              dialog: () => ({
                  style: "LIST",
                  caption: `Haworth > Comandos disponibles (${commands.length})`,
                  info: commands.map(command => `/${command.name}`).join("\n"),
                  button1: "Seleccionar",
                  button2: "Cerrar"
              }),
  
              run_logic: async ({ response, listItem, inputText }) => {
  
                const command = commands[listItem];
  
                const commandInfo = Object.entries(command)
                .filter(([k, v]) => v && !unvisibleKeys.includes(k))
                .map(([k, v]) => {
                  const coloredKey = `{FF4040}${COMMAND_TRANSLATIONS[k as keyof typeof COMMAND_TRANSLATIONS]}{FFFFFF}`;
              
                  if (k === "category" || k === "syntax") return `${coloredKey}: ${k === "syntax" ? `"${v}"` : `${getCommandCategoryTranslation(v)}.`}`;
  
                  if (k === "subcategory") {
                    const category = command.category;
                    if (!category) return;
  
                    const subcategory = v as CommandSubCategory<typeof category>;
                    return `${coloredKey}: ${getCommandSubCategoryDescription(category, subcategory)}.`;
                  }
  
                  if (k === "aliases") return `${coloredKey}: ${formatList(v)}.`;
                  
                  return `${coloredKey}\n${v}`;
                })
                .join("\n\n");
  
                state.dialogData.set("command_name", command.name);
                state.dialogData.set("command_info", commandInfo);
  
              },
          },
  
          {
            dialog: () => ({
                style: "MSGBOX",
                caption: `Haworth {FF4040}>{C3C3C3} Comando "{FFFFFF}/{FF4040}${state.dialogData.get("command_name")}{C3C3C3}"`,
                info: "{C3C3C3}[{FF4040}!{C3C3C3}] Si algún dato se encuentra incorrecto, contacta a los desarrolladores.\n" + state.dialogData.get("command_info") as string,
                button1: "Volver",
                button2: "Cerrar"
            }),
  
            run_logic: async ({ response, listItem, inputText }) => {
              if (response) return { step: 0 };
            },
        },
      ]);
  
      await manager.start();
  
      return next();
    }
  
});