import { DialogManager } from "@managers/DialogManager";
import StaffCommand from "@commands/StaffCommand";
import { INTERIOR_LIST, type IPropsInterior } from "@modules/maps";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "interiors",
    requiredFlag: "EXTRAS",
    loggable: false,
    description: "",
    aliases: ["interiors"],
    run: async ({ player, subcommand, next }) => {
        
        const allInteriors = Object.entries(INTERIOR_LIST);

        const uniqueTypes = [...new Set(allInteriors.map(([_, data]) => data.type))].sort();

        const state = {
            opts: new Map<string, any>()
        };

        const manager = new DialogManager({ player, state });

        // Tipo | Cantidad disponible
        const formatTypesList = () => uniqueTypes.map(type => {
            const count = allInteriors.filter(([_, data]) => data.type === type).length;

            return `${type}\t${count} disponibles`;
        }).join("\n");

        // Key | Nombre | Tamaño
        const formatInteriorList = (ints: [string, IPropsInterior][]) => {
            return ints.map(([key, data]) => {
                return `{FFFF00}${key}{FFFFFF}\t${data.name}\t${data.size}`;
            }).join("\n");
        };


        manager.setDialogs([
            // --- DIÁLOGO 1: SELECCIÓN DE CATEGORÍA ---
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: `Catálogo de Casas > Categorías (${uniqueTypes.length})`,
                    info: "Categoría\tCantidad\n" + formatTypesList(),
                    button1: "Seleccionar",
                    button2: "Cerrar"
                }),
    
                run_logic: async ({ response, listItem }) => {
                    if (!response) return manager.stop();

                    const selectedType = uniqueTypes[listItem];
                    state.opts.set("selected_type", selectedType);

                    // Filtramos la lista global para obtener solo los de este tipo
                    const filteredInteriors = allInteriors.filter(([_, data]) => data.type === selectedType);
                    
                    if (!filteredInteriors.length) {
                        player.sendClientMessage(Colors.WrongSintaxis, "Error: No hay interiores en esta categoría.");
                        return manager.stop();
                    }

                    state.opts.set("filtered_list", filteredInteriors);
                },
            },
            // --- DIÁLOGO 2: LISTADO DE INTERIORES ---
            {
                dialog: () => {
                    const typeName = state.opts.get("selected_type");
                    const list = state.opts.get("filtered_list") as [string, IPropsInterior][];

                    return {
                        style: "TABLIST_HEADERS",
                        caption: `Categoría: ${typeName}`,
                        // Header explicativo para el admin
                        info: "KEY (Usar en /createhouse)\tNombre\tTamaño\n" + formatInteriorList(list),
                        button1: "Volver",
                        button2: "Cerrar"
                    };
                },
    
                run_logic: async ({ response, listItem }) => {
                    // Si da a "Volver" (Button 1 en lógica inversa o Button 2 según tu DialogManager)
                    // Asumimos que response false es botón derecho (Cerrar) y true es botón izquierdo (Volver/Seleccionar)
                    
                    if (response) {
                        // Aquí podrías hacer que al seleccionar, copie la KEY al chat o algo similar.
                        // Por ahora, volvemos atrás para explorar más.
                        return { step: 0 }; 
                    }

                    return manager.stop();
                },
            }
        ]);

        await manager.start();

        return next();


       /*  
        const BUSINESS_TYPES_LIST = Object.keys(BUSINESS_TYPES);

        const state = {
            opts: new Map<string, unknown>()
        };

        const manager = new DialogManager({ player, state });

        const formatBusinessTypesList = () => BUSINESS_TYPES_LIST.map(t => `${BUSINESS_TYPES[t as BusinessType]}\t${t}`).join("\n");
        const formatInteriorList = (ints: IPropsInterior[]) => ints.map(int => `${int.name} (${int.size})\t${int.x}\t${int.y}\t${int.z}`).join("\n");

        manager.setDialogs([
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: `Haworth > Listado de tipos de interiores (${BUSINESS_TYPES_LIST.length})`,
                    info: "Nombre\tTipo\n" + formatBusinessTypesList(),
                    button1: "X",
                    button2: "Cerrar"
                }),
    
                run_logic: async ({ response, listItem, inputText }) => {
                    state.opts.set("selected_int", BUSINESS_TYPES_LIST[listItem]);

                    const businessData = getBusinessInteriorsList(BUSINESS_TYPES_LIST[listItem] as BusinessType);
                    if (!businessData.length) {
                        player.sendClientMessage(Colors.AlertRed, "No se han encontrado interiores para ese tipo de negocio.");
                        return { step: 0 };
                    }

                    state.opts.set("selected_ints_data", businessData);
                },
            },
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: `Haworth > Interiores de tipo '${state.opts.get("selected_int")}' (${(state.opts.get("selected_ints_data") as IPropsInterior[]).length})`,
                    info: "Nombre (Tamaño)\tX\tY\tZ\n" + formatInteriorList(state.opts.get("selected_ints_data") as IPropsInterior[]),
                    button1: "Volver",
                    button2: "Cerrar"
                }),
    
                run_logic: async ({ response, listItem, inputText }) => {
                    if (response) return { step: 0 };

                    return manager.stop();
                },
            }
        ])


        await manager.start(); 

        return next();*/

    }
});