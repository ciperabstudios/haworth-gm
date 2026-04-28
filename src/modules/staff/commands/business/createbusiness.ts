import { DialogManager } from "@managers/DialogManager";
import StaffCommand from "@commands/StaffCommand";
import { BUSINESS_TYPES, type BusinessType } from "@modules/business/constants";
import { Colors } from "@modules/server/colors";
import type { IPropsInterior } from "@modules/maps";
import { moneyFormat } from "@modules/server/functions";
import { showInfoForPlayer } from "@modules/filterscripts";
import { businessService, getBusinessInteriorsList } from "@modules/business";


new StaffCommand({
    name: "createbusiness",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    aliases: ["crearnegocio", "crearneg", "createbiz"],
    run: async ({ player, subcommand, next }) => {

        if (!player.isSpawned()) return player.sendClientMessage(Colors.White, "Tienes que estar spawneado para poder usar este comando.");

        const BUSINESS_TYPES_LIST = Object.keys(BUSINESS_TYPES);

        const state = {
            opts: new Map<string, unknown>()
        };

        const OPTIONS = {
            TYPE: 0,
            NAME: 1,
            PRICE: 2,
            FINISH_CREATION: 3
        };

        const hasAllRequiredFields = () => !!state.opts.get("name") && !!state.opts.get("type") && !!state.opts.get("price");

        const formatBusinessTypesList = () => BUSINESS_TYPES_LIST.map(t => `${BUSINESS_TYPES[t as BusinessType]}\t${t}`).join("\n");
        const formatInteriorList = (ints: IPropsInterior[]) => ints.map(int => `${int.name} (${int.size})\t${int.x}\t${int.y}\t${int.z}`).join("\n");

        const manager = new DialogManager({ player, state });

        manager.setDialogs([
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: "Haworth {FF6359}>{C3C3C3} Creación de negocio",
                    info: "{FF6359}Propiedad\t{FF6359}Valor\n" + `Tipo\t${state.opts.get("type") ? `${BUSINESS_TYPES[state.opts.get("type") as BusinessType]} (${state.opts.get("type")})` : "Sin tipo definido"}\nNombre\t${state.opts.get("name") || "Sin nombre asignado"}\nPrecio\t${state.opts.get("price") ? `{157811}$\{FFFFFF}${moneyFormat(Number(state.opts.get("price")))}` : "Sin precio asignado"}\n{9EC73D}Finalizar creación`,
                    button1: "X",
                    button2: "Cerrar"
                }),

                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) {
                        state.opts.set("name", null);
                        return manager.stop();
                    }

                    if (listItem === OPTIONS.FINISH_CREATION) {

                        if (!hasAllRequiredFields()) {
                            showInfoForPlayer(player, "~r~No puedes finalizar la creación sin completar todos los campos.", 3000);
                            return { step: 0 };
                        }

                        return manager.stop();
                    }

                    state.opts.set("opt", listItem);

                    if (listItem === OPTIONS.TYPE) return { step: 2 };
                },
            },
            {
                dialog: () => ({
                    style: "INPUT",
                    caption: "H. {FF6359}>{C3C3C3} Creación de negocio",
                    info: `Ingrese el ${state.opts.get("opt") === OPTIONS.NAME ? "nombre" : "precio"}:`,
                    button1: "Confirmar",
                    button2: "Volver"
                }),

                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: 0 };

                    if (state.opts.get("opt") === OPTIONS.PRICE) {
                        if (!Number.isFinite(Number(inputText))) {
                            showInfoForPlayer(player, "~r~El precio tiene que ser un valor numérico válido.", 3000);
                            return { step: 1 };
                        };
                            
                        if (Number(inputText) <= 0) {
                            showInfoForPlayer(player, "~r~No puedes asignar un precio menor o igual a cero ~w~(~h~~h~0~w~)~r~.", 3000);
                            return { step: 1 };
                        };
                        
                    }

                    state.opts.set(state.opts.get("opt") === OPTIONS.NAME ? "name" : "price", inputText);
                    return { step: 0 };
                },
            },
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: "Haworth {FF6359}>{C3C3C3} Selecciona el tipo de negocio",
                    info: "{FF6359}Nombre\t{FF6359}Tipo\n" + formatBusinessTypesList(),
                    button1: "X",
                    button2: "Volver"
                }),

                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: 0 };

                    const selectedType = BUSINESS_TYPES_LIST[listItem];

                    const businessData = getBusinessInteriorsList(selectedType as BusinessType);

                    if (!businessData.length) {
                        showInfoForPlayer(player, "~r~No se han encontrado interiores para ese tipo de negocio.", 3000);
                        return { step: 0 };
                    }

                    state.opts.set("type", selectedType);
                    state.opts.set("selected_ints_data", businessData);
                },
            },
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: `Haworth {FF6359}>{C3C3C3} Selecciona el interior (tipo '${state.opts.get("type")}')`,
                    info: "{FF6359}Nombre (Tamaño)\t{FF6359}X\t{FF6359}Y\t{FF6359}Z\n" + formatInteriorList(state.opts.get("selected_ints_data") as IPropsInterior[]),
                    button1: "X",
                    button2: "Volver"
                }),

                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: 2 };

                    state.opts.set("selected_int", (state.opts.get("selected_ints_data") as IPropsInterior[])[listItem]);

                    return { step: 0 };
                },
            }
        ]);

        await manager.start();

        if (!state.opts.get("name")) return next();

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        const { x: iX, y: iY, z: iZ, interiorId } = state.opts.get("selected_int") as IPropsInterior;

        /*
        await businessRepository.create({ 
            type: state.opts.get("type") as BusinessType,
            name: state.opts.get("name") as string,
            forSale: {
                price: state.opts.get("price") as number,
                available: true
            },
            inUse: false,
            owner: null,
            coordinates: { Exterior: { x, y, z, vw, int },  Interior: { x: iX, y: iY, z: iZ, int: interiorId } }
        });
        */

        await businessService.createBusiness({
            name: state.opts.get("name") as string,
            price: state.opts.get("price") as number,
            coordinates: { interior: { x: iX, y: iY, z: iZ, int: interiorId }, exterior: { x, y, z, vw, int } }
        });

        return next();
    }
});