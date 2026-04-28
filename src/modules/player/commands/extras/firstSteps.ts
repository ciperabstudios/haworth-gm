import Command from "@commands/Command";
import { Dialog, DialogStylesEnum, type IDialog } from "@infernus/core";

new Command({
    name: "primerospasos",
    description: "",
    aliases: ["firststeps"],
    run: async ({ player, subcommand, next }) => {

        const character = player.character;
        if (!character) return;
    
        const TASK_COMPLETED = "{9EC73D}";
        const INCOMPLETE_TASK = "{8ab9bf}";
    
        const TASKS = [
            { id: "buyPhone", description: "Comprar un teléfono celular", reward: "5 XP" },
            { id: "firstSMSToFriend", description: "Envía tu primer mensaje de texto", reward: "5 XP" },
            { id: "firstCallToFriend", description: "Haz una primera llamada", reward: "5 XP" },
            { id: "employmentDocument", description: "Consigue el permiso de trabajo", reward: "5 XP" },
            { id: "interactNPC", description: "Interactúa con algún NPC", reward: "5 XP" },
            { id: "interactGPS", description: "Interactúa con el GPS", reward: "5 XP" },
            { id: "keySettings", description: "Configura las teclas de atajo", reward: "5 XP" },
            { id: "findJob", description: "Consigue un trabajo", reward: "5 XP" }
        ];
    
        const firstStepsData = TASKS.map((task, index) => {
            // TODO: Rearmar propiedad firstSteps dentro del personaje.
            const firstSteps: string[] = [];

            const taskColor = firstSteps.includes(task.id) ? TASK_COMPLETED : INCOMPLETE_TASK;
            return `${index + 1}.\t${taskColor}${task.description}{FFFFFF}\t${task.reward}\n`;
        }).join("");
    
        const dialogData: IDialog = {
            style: DialogStylesEnum.TABLIST_HEADERS,
            caption: `Lista de primeros pasos`,
            info: `#\tTarea\tRecompensa\n${firstStepsData}`,
            button1: "X",
            button2: "O"
        };
    
        const settingsDialog = new Dialog(dialogData);
    
        const { response } = await settingsDialog.show(player);
    
        if (!response) return Dialog.close(player);
        
        return next();
    }
});