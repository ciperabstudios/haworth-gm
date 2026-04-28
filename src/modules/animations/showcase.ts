import { CameraCutStylesEnum, DynamicActor, Player, TextDraw, TextDrawAlignEnum, TextDrawFontsEnum } from "@infernus/core";
import { DialogManager } from "@managers/DialogManager";
import { getCharacterCameraPositionBehind, getCharacterCameraPositionFront } from "@modules/player";
import { Colors } from "@modules/server/colors/constants";
import { capitalize } from "@utils/capitalize";
import { ANIMATION_CATEGORIES, type AnimationCategory, type IAnimation } from "./constants";
import { AnimationsService } from "./core";
import animations from "./list";

/*
X → Izquierda / Derecha
    * Aumenta hacia la derecha (Este)
    * Disminuye hacia la izquierda (Oeste)

Y → Adelante / Atrás
    * Aumenta hacia adelante (Norte)
    * Disminuye hacia atrás (Sur)

Z → Arriba / Abajo
    * Aumenta al subir
    * Disminuye al bajar

*/


export class AnimationsShowcase {
    private static showcaseMode         = new Map<Player, boolean>();
    private static showcaseModeForActor = new Map<Player, boolean>();
    private static playerTds            = new Map<Player, TextDraw[]>();
    private static categoryTd           = new Map<Player, TextDraw>();
    private static playerState          = new Map<Player, { forActor?: DynamicActor, category: AnimationCategory, anims: IAnimation[], index: number }>();

    static isPlayerOn(player: Player, forActor: boolean = false) {
        if (forActor) return !!this.showcaseModeForActor.get(player);

        return !!this.showcaseMode.get(player);
    }


    static enableShowcase(player: Player, forActor: boolean = false) {
        if (forActor) this.showcaseModeForActor.set(player, true);

        this.showcaseMode.set(player, true);
    }


    static disableShowcase(player: Player, forActor: boolean = false) {
        if (forActor) this.showcaseModeForActor.set(player, false);

        this.showcaseMode.set(player, false);

        this.clearPlayerTextdraws(player);

        player.clearAnimations();
        player.toggleControllable(true);
        player.setCameraBehind();
    }


    static getPlayerState(player: Player) {
        return this.playerState.get(player);
    }


    static setCharacterAnimation(character: Player | DynamicActor, anim: IAnimation) {
        character.applyAnimation(anim.library, anim.name, anim.vel, !!anim.aLoop, false, false, !!anim.freeze);
    }


    static applyRelativeAnimation(player: Player, direction: "NEXT" | "PREVIOUS", forActor: boolean = false) {
        const state = this.playerState.get(player);
        if (!state) return;

        const { anims, category, index: currentIndex } = state;

        const size = anims.length;

        const newIndex = direction === "NEXT"
            ? (currentIndex + 1) % size
            : (currentIndex - 1 + size) % size;

        state.index = newIndex;

        const animation = anims[newIndex];
        this.setCharacterAnimation(forActor ? state.forActor! : player, animation);
        this.updateCategoryText(player, category, newIndex);
    }


    static createTextdraws(player: Player, category: AnimationCategory) {
        const leftButton = new TextDraw({ player, x: 225, y: 400, text: "LD_BEAT:left" })
                                .create()
                                .setSelectable(true)
                                .setFont(TextDrawFontsEnum.SPRITE)
                                .setTextSize(20, 20)
                                .show(player)


        const rightButton = new TextDraw({ player, x: 400, y: 400, text: "LD_BEAT:right" })
                                .create()
                                .setSelectable(true)
                                .setFont(TextDrawFontsEnum.SPRITE)
                                .setTextSize(20, 20)
                                .show(player)

        const animationText = new TextDraw({ player, x: 325, y: 400, text: `${category} (1)` })
                                .create()
                                .setLetterSize(0.3, 1.5)
                                .setAlignment(TextDrawAlignEnum.CENTER)
                                .setColor(-1)
                                .setShadow(1)
                                .setOutline(1)
                                .setBackgroundColors(150)
                                .setFont(1)
                                .setProportional(true)
                                .show(player)


        this.playerTds.set(player, [leftButton, rightButton, animationText]);
        this.categoryTd.set(player, animationText);

        player.selectTextDraw(0xFF6359FF);
    }


    static clearPlayerTextdraws(player: Player) {
        const tds = this.playerTds.get(player);
        if (tds) tds.forEach(td => td.destroy());
    }


    static updateCategoryText(player: Player, newCategory: AnimationCategory, index: number) {
        const td = this.categoryTd.get(player);
        if (td) td.setString(`${newCategory} (${index + 1})`, player);
    }


    static async showAnimationList(player: Player) {
        const state = {
            anims: new Map<AnimationCategory, IAnimation[]>(),
            category: "" as AnimationCategory,
            cameraPosition: "" as "BEHIND" | "FRONT"
        };

        const RED_ARROW = "{FF6359}>{C3C3C3}";

        const mappedCategories = ANIMATION_CATEGORIES.map(c => {
            const categoryLength = AnimationsService.getAnimsFromCategory(c).length;

            return `${capitalize(c.toLowerCase().replace(/[_]/g, " "))}\t{FF6359}${categoryLength}`;
        });

        const manager = new DialogManager({ player, state });

        manager.setDialogs([
            {
                dialog: () => ({
                    style: "TABLIST_HEADERS",
                    caption: `Haworth ${RED_ARROW} Lista de animaciones (${AnimationsService.getSize()} anims.)`,
                    info: "Categoría\tVariantes\n" + mappedCategories.join("\n"),
                    button1: "X",
                    button2: "Cerrar"
                }),

                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return manager.stop();

                    const category = inputText.toUpperCase().replace(/ /g, "_") as AnimationCategory;
                    state.category = category;

                    state.anims.set(category, animations[category]);
                }
            },
            {
                dialog: () => ({
                    style: "TABLIST",
                    caption: `Haworth ${RED_ARROW} Posición de la cámara`,
                    info: "De frente.\nDe espaldas.",
                    button1: "X",
                    button2: "Volver"
                }),

                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: 0 };

                    const cameraPosition = inputText === "De frente." ? "FRONT" : "BEHIND";
                    state.cameraPosition = cameraPosition;
                }
            }
        ]);

        await manager.start();

        return state;
    }


    static async forPlayer(player: Player, category: AnimationCategory, anims: IAnimation[], cameraPosition: "BEHIND" | "FRONT") {
        this.enableShowcase(player);

        player.applyAnimation("ped", "IDLE_stance", 4.1, true, false, false, true, 0);

        player.toggleControllable(false);

        player.sendClientMessage(Colors.Green, "[!] Presiona ESC para finalizar la selección.");

        const { x, y, z } = player.getPos();
        const { x: cameraX, y: cameraY, z: cameraZ } = cameraPosition === "FRONT" ? getCharacterCameraPositionFront(player) : getCharacterCameraPositionBehind(player);

        player.interpolateCameraPos(
            cameraX, cameraY, cameraZ,
            cameraX, cameraY, cameraZ,
            2000,
            CameraCutStylesEnum.CUT
        );

        player.interpolateCameraLookAt(
            x, y, z + 0.5,
            x, y, z + 0.5,
            2000,
            CameraCutStylesEnum.MOVE
        );

        this.createTextdraws(player, category);

        this.playerState.set(player, { category, anims, index: 0 });
    
        this.setCharacterAnimation(player, anims[0]);
    }


    static async forActor(player: Player, actor: DynamicActor, category: AnimationCategory, anims: IAnimation[], cameraPosition: "BEHIND" | "FRONT") {
        this.enableShowcase(player, true);

        player.applyAnimation("ped", "IDLE_stance", 4.1, true, false, false, true, 0);

        player.toggleControllable(false);

        player.sendClientMessage(Colors.Green, "[!] Presiona ESC para finalizar la selección.");

        const { x, y, z } = actor.getPos();
        const { x: cameraX, y: cameraY, z: cameraZ } = cameraPosition === "FRONT" ? getCharacterCameraPositionFront(actor) : getCharacterCameraPositionBehind(actor);

        player.interpolateCameraPos(
            cameraX, cameraY, cameraZ,
            cameraX, cameraY, cameraZ,
            2000,
            CameraCutStylesEnum.CUT
        );

        player.interpolateCameraLookAt(
            x, y, z + 0.5,
            x, y, z + 0.5,
            2000,
            CameraCutStylesEnum.MOVE
        );

        this.createTextdraws(player, category);

        this.playerState.set(player, { forActor: actor, category, anims, index: 0 });

        this.setCharacterAnimation(actor, anims[0]);
    }
}