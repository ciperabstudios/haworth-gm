import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import { DialogManager, type DialogsData } from "@managers/DialogManager";
import { playerInventoryService } from "@modules/inventory/infrastructure";
import { redString } from "@modules/server/colors";
import { FLATTENED_WEAPON_ARCHETYPES, isReloadableArchetype, OBJECT_CATALOG, type IReloadableWeaponItem, type IWeaponItem } from "./catalog";
import { objectService, WeaponObject } from "./core";
import { isReloadable, type WeaponCategory } from "./interface";


interface IObjectListState {
    selectedCategory: "FOOD" | "DRINK" | "WEAPON" | null;
    selectedObjectName: string | null; 
    selectedSubCategory: WeaponCategory | null;
}

new StaffCommand({
    name: "createobject",
    aliases: ["crearobjeto"],
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        const inv = playerInventoryService.get(player)!;
        const hands = inv.getHands();

        // TODO: Hacer que se caiga al piso si tiene ambas manos ocupadas.
        if (hands.isHandBusy("left") && hands.isHandBusy("right")) return player.sendClientMessage(-1, "Tienes ambas manos ocupadas.");

        const CREATE_OBJECT_STEPS = {
            CATEGORY_LIST: 0,
            SELECT_CATEGORY_OR_SUBCATEGORY: 1,
            SELECT_OBJECT: 2
        } as const;

        const manager = new DialogManager<IObjectListState>({ 
            player, 
            state: {
                selectedCategory: null,
                selectedObjectName: null,
                selectedSubCategory: null,
            } 
        });

        const RED_ARROW = redString(">");

        const steps: DialogsData<IObjectListState>[] = [
            {
                dialog: (state) => {
                    const categories = ["Comida", "Bebida", "Armas"];

                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Crear objeto ${RED_ARROW} Seleccionar categoría`,
                        info: categories.join("\n"),
                        button1: "O",
                        button2: "X"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return manager.stop();

                    const options = ["FOOD", "DRINK", "WEAPON"] as const;

                    manager.state.selectedCategory = options[listItem];
                }
            },
            {
                dialog: (state) => {
                    const category = state.selectedCategory!;

                    if (category === "WEAPON") {
                        const subCategories = ["Pistolas", "Fusiles de asalto", "Escopetas", "Rifles de francotirador", "Ametralladoras", "Armas pesadas", "Armas arrojadizas"];

                        return {
                            style: "LIST",
                            caption: `H. ${RED_ARROW} Crear objeto ${RED_ARROW} Armas ${RED_ARROW} Seleccionar subcategoría`,
                            info: subCategories.join("\n"),
                            button1: "O",
                            button2: "X"
                        };
                    }

                    const allCategoryItems = Object.keys(OBJECT_CATALOG[category]);

                    return {
                        style: "LIST",
                        paginated: true,
                        caption: `H. ${RED_ARROW} Crear objeto ${RED_ARROW} ${category === "FOOD" ? "Comida" : "Bebida"} ${RED_ARROW} Seleccionar objeto`,
                        info: allCategoryItems,
                        button1: "O",
                        button2: "X"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) {
                        manager.state.selectedCategory = null;
                        return { step: CREATE_OBJECT_STEPS.CATEGORY_LIST }
                    }

                    const category = manager.state.selectedCategory!;

                    if (category === "WEAPON") {
                        const subOptions: WeaponCategory[] = ["PISTOLS", "ASSAULT_RIFLES", "SHOTGUNS", "SNIPER_RIFLES", "SUBMACHINES_GUNS", "HEAVY_WEAPONS", "THROWN_WEAPONS"]; 

                        manager.state.selectedSubCategory = subOptions[listItem];
                        return { step: CREATE_OBJECT_STEPS.SELECT_OBJECT };
                    }

                    const allCategoryItems = Object.keys(OBJECT_CATALOG[category]);

                    manager.state.selectedObjectName = allCategoryItems[listItem];
                }
            },
            {
                dialog: (state) => {
                    const subCategory = state.selectedSubCategory!;

                    const formattedSubCategories: Record<WeaponCategory, string> = {
                        "PISTOLS": "Pistolas",
                        "ASSAULT_RIFLES": "Fusiles de asalto",
                        "SHOTGUNS": "Escopetas",
                        "SNIPER_RIFLES": "Rifles de francotirador",
                        "SUBMACHINES_GUNS": "Ametralladoras",
                        "HEAVY_WEAPONS": "Armas pesadas",
                        "THROWN_WEAPONS": "Armas arrojadizas"
                    } as const;

                    const allSubCategoryWeapons = Object.keys(OBJECT_CATALOG.WEAPON[subCategory])
                        .map(w => {
                            const weapon = OBJECT_CATALOG.WEAPON[subCategory][w as keyof typeof OBJECT_CATALOG.WEAPON[typeof subCategory]] as IWeaponItem | IReloadableWeaponItem;

                            const archetype = FLATTENED_WEAPON_ARCHETYPES.get(weapon.archetype);
                            if (!archetype) return w;

                            const extraInfo = isReloadableArchetype(archetype) 
                                ? `${redString("(", "FFFFFF")}${weapon.archetype}, munición ${(weapon as IReloadableWeaponItem).magazine}${redString(")")}` 
                                : `${redString("(", "FFFFFF")}${weapon.archetype}${redString(")")}`;

                            return subCategory === "THROWN_WEAPONS" ? `${w} ${extraInfo}` : `${w}\t${extraInfo}`;
                        });

                    if (subCategory == "THROWN_WEAPONS") return {
                        style: "LIST",
                        paginated: true,
                        caption: `H. ${RED_ARROW} Crear objeto ${RED_ARROW} Armas ${RED_ARROW} ${formattedSubCategories[subCategory]} ${RED_ARROW} Seleccionar arma`,
                        info: allSubCategoryWeapons,
                        button1: "O",
                        button2: "X"
                    };

                    return {
                        style: "TABLIST_HEADERS",
                        paginated: true,
                        headers: "Nombre\tCaracterísticas",
                        caption: `H. ${RED_ARROW} Crear objeto ${RED_ARROW} Armas ${RED_ARROW} ${formattedSubCategories[subCategory]} ${RED_ARROW} Seleccionar arma`,
                        info: allSubCategoryWeapons,
                        button1: "O",
                        button2: "X"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) {
                        manager.state.selectedSubCategory = null;
                        return { step: CREATE_OBJECT_STEPS.SELECT_CATEGORY_OR_SUBCATEGORY };
                    }

                    const subCategory = manager.state.selectedSubCategory!;
                    const allSubCategoryWeapons = Object.keys(OBJECT_CATALOG.WEAPON[subCategory]);

                    manager.state.selectedObjectName = allSubCategoryWeapons[listItem];
                }
            }
        ];

        manager.setDialogs(steps);
        await manager.start();
        
        if (!manager.state.selectedCategory || !manager.state.selectedObjectName) return next();

        const weapon = await objectService.createObject(manager.state.selectedCategory, { name: manager.state.selectedObjectName as any });


        if (!hands.isHandBusy("left")) {
            playerInventoryService.grabObject(player, "left", weapon.id);
            return next();
        }

        if (!hands.isHandBusy("right")) {
            playerInventoryService.grabObject(player, "right", weapon.id);
            return next();
        }

        success();
        return next();
    }
});


new Command({
    name: "reloadcolt",
    description: "",
    run: async ({ player, subcommand, next }) => {
        const inv = await playerInventoryService.getOrCreate(player);
        if (!inv) return next();

        const hands = inv.getHands();

        if (!hands.isHandBusy("right")) return next();

        const obj = hands.getRight();
        if (!isReloadable(obj)) return next();

        const weapon = obj as WeaponObject;

        weapon.reload(10);
        await objectService.save(weapon);

        player.sendClientMessage(-1, `{CBA9E4} * Has utilizado un cargador de ${(obj as WeaponObject).magazine?.ammoType} para tu ${obj.name}; ahora tiene ${obj.getAmmoCount()} balas.`);
        return next();
    }
});