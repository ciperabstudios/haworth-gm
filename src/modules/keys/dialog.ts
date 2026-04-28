//import Command from "@commands/Command";
import { type Player } from "@infernus/core";
import { DialogManager, type DialogsData } from "@managers/DialogManager";
import { AVAILABLE_OPTIONS, KEY_MAPPING, type IKeyStateDialog, type IKeyUpdate, type KeyMappingBits, type KeyMappingGroup, type KeyOption } from "./definitions";
import { keyService } from "./infrastructure";


export const showKeysDialog = async (player: Player) => {
    const buttons = {
        button1: "O",
        button2: "X"
    };

    const manager = new DialogManager<IKeyStateDialog>({ 
        player, 
        state: { updates: [] } 
    });

    const KEYS_STEPS = {
        MAIN_MENU: 0,
        OPTION_LIST: 1,
        ADD_ACTION: 2,
        CHANGE_KEY: 3,
    }

    const steps: DialogsData<IKeyStateDialog>[] = [
        { // 0 -> Menú principal (categorías).
            dialog: (state) => {
                const options = ["A pie", "En vehículo"/* , "Híbridas" */];

                return {
                    style: "LIST",
                    caption: "H. > Teclas",
                    info: options.join("\n"),
                    ...buttons
                };
            },
            run_logic: async ({ response, listItem, inputText }) => {
                if (!response) return manager.stop();

                const groups: /* KeyOptionGroup */KeyMappingGroup[] = ["ON_FOOT", "IN_VEHICLE"/* , "HYBRID" */];
                manager.state.currentGroup = groups[listItem];
            }
        },
        { // 1 -> Listado de teclas/acciones asignadas según grupo.
            dialog: (state) => {
                const group = state.currentGroup!;
                const currentKeys = keyService.getKeys(player);

                const optionsData = AVAILABLE_OPTIONS[group];

                if (!currentKeys || !optionsData) return {
                    style: "MSGBOX", 
                    caption: "Error", 
                    info: "Datos no disponibles, contacta al\nequipo administrativo si el error persiste.", 
                    button1: "Cerrar", 
                };

                const listItems = optionsData.map(([key, label]) => {
                    const currentBit = (currentKeys[group] as any)[key] as /* KeyBitsByGroup */KeyMappingBits | null;

                    if (!currentBit) return;

                    const keyLabel = keyService.getKeyLabelFromBits(currentBit, group);

                    /* const keyLabel = currentBit
                        ? keyService.getKeyLabelFromBits(currentBit, group)
                        : "";//"{A9A9A9}Sin asignar"; */

                    const groupShortcuts = currentKeys[group] as Partial<Record<string, number | null>>;
                    const color = `{${keyService.getKeyColor(groupShortcuts, currentBit)}}`;

                    return `{FFFFFF}${label}\t${color}${keyLabel}`;
                });

                const options = [...listItems];
                if (optionsData.length === listItems.length) options.unshift("Agregar acción...");

                const formattedGroup = group === "ON_FOOT" ? "A pie" : "En vehículo";

                return {
                    style: "TABLIST_HEADERS",
                    caption: `H. > Teclas > ${formattedGroup}`,
                    info: `Acción\tTecla asignada\n${options.join("\n")}`,
                    button1: "Cambiar",
                    button2: "Volver"
                };
            },
            run_logic: async ({ response, listItem, inputText }) => {
                if (!response) return { step: KEYS_STEPS.MAIN_MENU };
                
                if (listItem === 0) return { step: KEYS_STEPS.ADD_ACTION };

                const group = manager.state.currentGroup!;
                const optionsData = AVAILABLE_OPTIONS[group];

                const currentKeys = keyService.getKeys(player)!;

                const filteredOptions = optionsData.filter(([key, label]) => {
                    const currentBit = (currentKeys[group] as any)[key] as /* KeyBitsByGroup */KeyMappingBits | null;

                    if (currentBit) return label;
                });

                manager.state.currentActionKey = filteredOptions[listItem - 1][0];
                return { step: KEYS_STEPS.CHANGE_KEY };
            }
        },
        { // 2 -> Agregar acción.
            dialog: (state) => {
                const group = state.currentGroup!;
                const allOptions = AVAILABLE_OPTIONS[group];

                const currentKeys = keyService.getKeys(player)!;

                const listItems = allOptions.map(([key, label]) => {
                    const currentBit = (currentKeys[group] as any)[key] as /* KeyBitsByGroup */KeyMappingBits | null;

                    if (!currentBit) return label;
                });

                const formattedGroup = group === "ON_FOOT" ? "A pie" : "En vehículo";

                return {
                    style: "LIST",
                    caption: `H. > Teclas > ${formattedGroup} > Agregar acción`,
                    info: listItems.join("\n"),
                    button1: "Agregar",
                    button2: "Volver"
                }
            },
            run_logic: async ({ response, listItem, inputText }) => {
                if (!response) return { step: KEYS_STEPS.OPTION_LIST };

                const group = manager.state.currentGroup!;
                const optionsData = AVAILABLE_OPTIONS[group];

                const currentKeys = keyService.getKeys(player)!;

                const filteredOptions = optionsData.filter(([key, label]) => {
                    const currentBit = (currentKeys[group] as any)[key] as /* KeyBitsByGroup */KeyMappingBits | null;

                    if (!currentBit) return label;
                });

                manager.state.currentActionKey = filteredOptions[listItem][0];



                //return { step: KEYS_STEPS. }
            }
        },
        { // 3 -> Cambiar tecla.
            dialog: (state) => {
                const group = state.currentGroup!;
                const actionKey = state.currentActionKey!;

                const mapping = KEY_MAPPING[group];

                const availableKeys = Object.entries(mapping);
                const listItems = availableKeys.map(([bit, label]) => label);

                const fullList = ["Desasignar tecla", ...listItems];

                const label = keyService.getDataFromKey(actionKey as KeyOption<typeof group>, group)[1];

                const formattedGroup = group === "ON_FOOT" ? "A pie" : "En vehículo";

                return {
                    style: "LIST",
                    caption: `H. > Teclas > ${formattedGroup} > ${label} > Seleccionar tecla`,
                    info: fullList.join("\n"),
                    button1: "Guardar",
                    button2: "Cancelar"
                };
            },
            run_logic: async ({ response, listItem, inputText }) => {
                if (!response) return { step: KEYS_STEPS.OPTION_LIST };

                const group = manager.state.currentGroup!;
                const actionKey = manager.state.currentActionKey!;

                let newBit: number | null = null;

                if (listItem > 0) {
                    const mapping = KEY_MAPPING[group];
                    const availableKeys = Object.entries(mapping);

                    const selectedEntry = availableKeys[listItem - 1];
                    newBit = Number(selectedEntry[0]);
                }

                const update: IKeyUpdate = {
                    state: group,
                    key: actionKey as any,
                    action: newBit as any
                };

                manager.state.updates.push(update);

                await keyService.updateKeysCache(player, [update]);

                return { step: KEYS_STEPS.OPTION_LIST };
            }
        }
    ];

    manager.setDialogs(steps);
    await manager.start();


    await keyService.updateKeysDatabase(player, manager.state.updates);
}