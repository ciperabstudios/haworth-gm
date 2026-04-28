import StaffCommand from "@commands/StaffCommand";
import { Player, PlayerEvent, TextDraw, TextDrawAlignEnum } from "@infernus/core";
import { Colors } from "@modules/server/colors";


type DebugCoordsTD = {
    root: TextDraw[];
    posX: TextDraw;
    posY: TextDraw;
    posZ: TextDraw;
    camX: TextDraw;
    camY: TextDraw;
    camZ: TextDraw;
    vw: TextDraw;
    int: TextDraw;
};

const debugCoordsCache = new Map<Player, DebugCoordsTD>();


const createDebugCoords = (player: Player) => {
    if (player.isSpectating()) return;

    const { x: pX, y: pY, z: pZ } = player.getPos();
    const { x: cX, y: cY, z: cZ } = player.getCameraPos();
    const [vw, int ] = [player.getVirtualWorld(), player.getInterior()];

    // 0 - Background
    const bgTd = new TextDraw({ x: 572, y: 136, player, text: "_" })
        .create()
        .setFont(1)
        .setLetterSize(0.6, 12.35)
        .setTextSize(324, 127.5)
        .setOutline(0)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(0xFFFFFF00)
        .setBackgroundColors(255)
        .useBox(true)
        .setBoxColors(135)
        .setProportional(true)
        .setSelectable(false);

    // 1 - Debug title
    const debugTitleTd = new TextDraw({ x: 572, y: 122, player, text: "Debug" })
        .create()
        .setFont(1)
        .setLetterSize(0.391666, 2.0)
        .setTextSize(405, 72)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(0xFF6359FF)
        .setProportional(true)
        .setSelectable(false);

    // 2 - Coords label
    const coordsSubTitleTd = new TextDraw({ x: 572, y: 149, player, text: "Coords" })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(400, 17)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 3 - X
    const posXTd = new TextDraw({ x: 528, y: 167, player, text: `x: ${pX.toFixed(2)}` })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(408.5, 44)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 4 - Y
    const posYTd = new TextDraw({ x: 571, y: 167, player, text: `y: ${pY.toFixed(2)}` })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(408.5, 44)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 5 - Z
    const posZTd = new TextDraw({ x: 616, y: 167, player, text: `z: ${pZ.toFixed(2)}` })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(408.5, 44)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 6 - Camera Coords label
    const cameraCoordsSubTitleTd = new TextDraw({ x: 572, y: 186, player, text: "Coords (Camera)" })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(400, 59)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 7 - Cam X
    const camXTd = new TextDraw({ x: 528, y: 202, player, text: `x: ${cX.toFixed(2)}` })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(408.5, 44)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 8 - Cam Y
    const camYTd = new TextDraw({ x: 571, y: 202, player, text: `y: ${cY.toFixed(2)}` })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(408.5, 44)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 9 - Cam Z
    const camZTd = new TextDraw({ x: 616, y: 202, player, text: `z: ${cZ.toFixed(2)}` })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(408.5, 44)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 10 - VW/INT label
    const vwIntSubTitleTd = new TextDraw({ x: 572, y: 219, player, text: "Vw - Int" })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(400, 59)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 11 - VW
    const vwTd = new TextDraw({ x: 556, y: 235, player, text: vw.toString() })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(400, 59)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    // 12 - Separator
    const separatorTd = new TextDraw({ x: 572, y: 235, player, text: "-" })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(400, 59)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(0xFF6359FF)
        .setProportional(true)
        .setSelectable(false);

    // 13 - Interior
    const intTd = new TextDraw({ x: 588, y: 235, player, text: int.toString() })
        .create()
        .setFont(1)
        .setLetterSize(0.191666, 1.05)
        .setTextSize(400, 59)
        .setOutline(1)
        .setShadow(0)
        .setAlignment(TextDrawAlignEnum.CENTER)
        .setColor(-1)
        .setProportional(true)
        .setSelectable(false);

    const all = [
        bgTd, debugTitleTd, 
        coordsSubTitleTd, posXTd, posYTd, posZTd,
        cameraCoordsSubTitleTd, camXTd, camYTd, camZTd,
        vwIntSubTitleTd, vwTd, separatorTd, intTd
    ];

    all.forEach(td => td.isValid() && td.show(player));

    debugCoordsCache.set(player, {
        root: all,

        posX: posXTd,
        posY: posYTd,
        posZ: posZTd,

        camX: camXTd,
        camY: camYTd,
        camZ: camZTd,

        vw: vwTd,
        int: intTd
    });
};


const destroyDebugCoords = (player: Player) => {
    const debug = debugCoordsCache.get(player);
    if (!debug) return;

    for (const td of debug.root) {
        if (td.isValid()) td.destroy();
    }

    debugCoordsCache.delete(player);
};


PlayerEvent.onUpdate(async ({ player, next }) => {
    const debug = debugCoordsCache.get(player);
    if (!debug) return next();

    if (debug && player.isSpectating()) {
        destroyDebugCoords(player);
        player.sendClientMessage(Colors.LightRed, "Has salido del modo debug al comenzar a espectear.");
        return next();
    }

    const { x, y, z } = player.getPos();
    const camera = player.getCameraPos();
    const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

    debug.posX.setString(`x: ${x.toFixed(2)}`);
    debug.posY.setString(`y: ${y.toFixed(2)}`);
    debug.posZ.setString(`z: ${z.toFixed(2)}`);

    debug.camX.setString(`x: ${camera.x.toFixed(2)}`);
    debug.camY.setString(`y: ${camera.y.toFixed(2)}`);
    debug.camZ.setString(`z: ${camera.z.toFixed(2)}`);

    debug.vw.setString(vw.toString());
    debug.int.setString(int.toString());

    return next();
});


new StaffCommand({
    name: "debug",
    requiredFlag: "DEVELOPER",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        const debug = debugCoordsCache.get(player);

        if (debug) {
            destroyDebugCoords(player);
            player.sendClientMessage(Colors.LightRed, "Has salido del modo debug.");
            return next();
        }

        createDebugCoords(player);

        player.sendClientMessage(Colors.LightGreen, "Has entrado en modo debug.");
        return next();
    }
});