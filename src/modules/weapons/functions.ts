import WeaponDamage from "@database/schemas/weaponDamage";
import { BodyPartsEnum, WeaponEnum } from "@infernus/core";
import { logger } from "@logger";
import { weaponDamageCache } from "./globals";
import { type IWeaponData, WEAPON_MODELS, type WeaponTypes } from "./models";


const setupWeaponDamageChangeStream = () => {
    const changeStream = WeaponDamage.watch();

    changeStream.on("change", async change => {
        switch (change.operationType) {
            case "insert": {
                const documentId = change.documentKey._id;
                const addedWeaponDamage = await WeaponDamage.findOne({ _id: documentId });

                const { weapon, data } = addedWeaponDamage!;

                weaponDamageCache.set(WeaponEnum[weapon], data);
                logger.debug(`[WEAPONS-CHANGESTREAM] Daño del arma '${weapon}' agregada. ID del documento: ${documentId}`);
                break;
            }

            case "update": {
                const documentId = change.documentKey._id;
                const updatedWeaponDamage = await WeaponDamage.findOne({ _id: documentId });

                const { weapon, data } = updatedWeaponDamage!;

                const existingWeaponDamage = weaponDamageCache.get(WeaponEnum[weapon]);

                if (!existingWeaponDamage) {
                    logger.debug(`[WEAPONS-CHANGESTREAM] Actualización ignorada. El arma ${weapon} no está almacenada.`);
                    break;
                }

                weaponDamageCache.set(WeaponEnum[weapon], data);
                logger.debug(`[WEAPONS-CHANGESTREAM] Daño del arma '${weapon}' actualizado. ID del documento: ${documentId}`);
                break;
            }

            case "delete": {
                const documentId = change.documentKey._id;
                const deletedWeaponDamage = await WeaponDamage.findOne({ _id: documentId });

                const { weapon } = deletedWeaponDamage!;

                const existingWeaponDamage = weaponDamageCache.get(WeaponEnum[weapon]);

                if (existingWeaponDamage) {
                    weaponDamageCache.delete(WeaponEnum[weapon]);
                    logger.debug(`[WEAPONS-CHANGESTREAM] '${weapon}' eliminada. ID del documento: ${documentId}`);
                    break;
                }

                logger.debug(`[WEAPONS-CHANGESTREAM] Eliminación ignorada. El arma '${weapon}' no está almacenada.`);
                break;
            }

            default:
                logger.debug(`[WEAPONS-CHANGESTREAM] Operación ${change.operationType} ignorada.`);
                break;
                
        }
    });

    changeStream.on("error", error => logger.error(`[WEAPONS-CHANGESTREAM] ${error.message}`));
};


export const loadWeaponDamageIntoCache = async () => {

    try {
        const weaponDamages = await WeaponDamage.find();

        weaponDamages.forEach(({ weapon, data }) => {
            weaponDamageCache.set(WeaponEnum[weapon], data);
        });
    
        logger.info(`[WEAPONS] Se han cargado ${weaponDamageCache.size} armas con sus daños en la caché.`);

        setupWeaponDamageChangeStream();
    
    } catch (error) {
        logger.error(`[WEAPONS] ${(error as Error).message}`);
    }
};


export const getWeaponDamage = (weapon: WeaponEnum, bodyPart: keyof typeof BodyPartsEnum): number => {
    const weaponData = weaponDamageCache.get(weapon);
    const bodyPartData = weaponData?.find(data => data.bodyPart === bodyPart);

    return bodyPartData?.damage || 0;
};


export const getWeaponsDamages = () => {
    return [...weaponDamageCache.values()];
};


export const updateWeaponDamage = async (weapon: WeaponEnum, bodyPart: keyof typeof BodyPartsEnum, newDamage: number) => {

    // Refresh cache.
    weaponDamageCache.set(weapon, [{ bodyPart, damage: newDamage }]);

    try {
        
        await WeaponDamage.findOneAndUpdate(
            { weapon: weapon, "data.bodyPart": bodyPart },
            { $set: { "data.$.damage": newDamage }      },
            { upsert: true                              }
        );

        logger.debug(`[WEAPONS] Daño actualizado en la DB: Arma [${weapon}] | Zona [${bodyPart}] | Daño [${newDamage}]`)

    } catch (error) {
        logger.error(`[WEAPONS] ${(error as Error).message}`);
    }
};


// Custom weapons.
export const getWeaponByType = (type: WeaponTypes) => {
    return Object.entries(WEAPON_MODELS).filter(Types => Types[0] === type).flat()[1] as Record<string, IWeaponData>;
};