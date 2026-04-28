import { ArtworkEnum, GameMode, PlayerEvent, Streamer } from "@infernus/core";

PlayerEvent.onRequestDownload(({ player, type, crc, next }) => {
    /* if (!player.isConnected()) return;

    let filename = "";
    let filefound = false;

    const DOWNLOAD_WEB = "http://localhost:3000/models";
    
    const handlers: Record<number, (crc: number, cb: (name: string) => void) => boolean> = {
        [ArtworkEnum.DOWNLOAD_REQUEST_TEXTURE_FILE]: (crc, cb) => {
            const { name } = GameMode.findTextureFileNameFromCRC(crc);
            if (name) {
                cb(name);
                return true;
            }
            return false;
        },
        [ArtworkEnum.DOWNLOAD_REQUEST_MODEL_FILE]: (crc, cb) => {
            const { name } = GameMode.findModelFileNameFromCRC(crc);
            if (name) {
                cb(name);
                return true;
            }
            return false;
        },
    };

    const handler = handlers[type];
    if (handler) {
        filefound = handler(crc, (name: string) => filename = name);
    }

    if (filefound && filename) {
        const finalUrl = `${DOWNLOAD_WEB}/${filename}`;
        player.redirectDownload(finalUrl);
    } */

   return next();
});