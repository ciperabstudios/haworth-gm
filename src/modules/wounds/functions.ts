import { Dynamic3DTextLabel, Player } from "@infernus/core";
import { deadUsers, injuredUsers, userWounds, type IWoundsData } from "./globals";

// TODO: Hacer el "revisar heridas con /verheridas ID".
export const setPlayerWoundState = (player: Player, state: "healthy" | "injured" | "dead") => {

    const woundStateLabel = new Dynamic3DTextLabel({ charset: "win1252", text: `(( Esta persona está ${state === 'injured' ? 'herida' : state === "dead" ? 'muerta' : ''}. ))`, color: "#FF6347", attachedPlayer: player.id, x: 0, y: 0, z: -0.4, drawDistance: 20, worldId: 1 });

    switch (state) {
        case "healthy":
            if (woundStateLabel.isValid()) woundStateLabel.destroy();

            if (injuredUsers.has(player)) injuredUsers.delete(player);
            if (deadUsers.has(player)) deadUsers.delete(player);
            break;


        case "injured":
            if (!woundStateLabel.isValid()) woundStateLabel.create();

            injuredUsers.add(player);
            break;


        case "dead":
            if (!woundStateLabel.isValid()) woundStateLabel.create();

            player.applyAnimation("ped", "FLOOR_hit_f", 4.1, false, false, false, true, 0, true);
            deadUsers.add(player);
            break;
    }
};


export const addPlayerWound = (player: Player, props: IWoundsData) => {
    if (!userWounds.has(player)) userWounds.set(player, []);
    
    userWounds.get(player)?.push(props);
};


export const clearPlayerWounds = (player: Player) => {
    if (!userWounds.get(player)?.length) return;

    userWounds.delete(player);
    userWounds.set(player, []);
};


export const getWoundType = () => {
    // TODO
};


export const getPlayerWounds = (player: Player) => {

    if (!userWounds.get(player)) return null;

    //console.log([...userWounds.get(player)!.values()]);
};