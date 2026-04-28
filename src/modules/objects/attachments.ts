import { BoneIdsEnum, type IAttachedObject } from "@infernus/core";

type TAttachmentObjectConfig = Omit<IAttachedObject, "materialColor1" | "materialColor2" | "modelId"> & Partial<Pick<IAttachedObject, "materialColor1" | "materialColor2">>;

interface IAttachmentConfig {
  RIGHT_HAND: TAttachmentObjectConfig;
  LEFT_HAND: TAttachmentObjectConfig;
  // TODO: ¿Añadir pecho?
}

const DEFAULT_FSCALE = { fScaleX: 1, fScaleY: 1, fScaleZ: 1 } as const;
const DEFAULT_ATTACHMENT_DATA = { fX: 0, fY: 0, fZ: 0, fRotX: 0, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE } as const;


export const OBJECT_ATTACHMENT_CONFIG = {

    // Predeterminado
    "DEFAULT": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  ...DEFAULT_ATTACHMENT_DATA }
    },

    // Armas.
    "WEAPON_BRASSKNUCKLE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.024999, fY: 0.000000, fZ: -0.005999, fRotX: 0, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE }
    },

    "WEAPON_GOLFCLUB": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.040000, fY: 0.067000, fZ: -0.003000, fRotX: -29.899999, fRotY: 152.000000, fRotZ: 176.000030, ...DEFAULT_FSCALE }
    },

    "WEAPON_NITESTICK": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.000000, fY: 0.059999, fZ: -0.022000, fRotX: 161.599990, fRotY: 10.700001, fRotZ: 5.800002, ...DEFAULT_FSCALE }
    },

    "WEAPON_KNIFE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.180999, fY: 0.000000, fZ: 0.017999, fRotX: 0.000000, fRotY: 177.800018, fRotZ: -8.799996, ...DEFAULT_FSCALE }
    },

    "WEAPON_BAT": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.135999, fY: 0.030999, fZ: 0.053999, fRotX: -17.900001, fRotY: 153.800018, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_SHOVEL": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.041999, fY: 0.051999, fZ: -0.080000, fRotX: -27.899986, fRotY: 155.800018, fRotZ: -167.499938, ...DEFAULT_FSCALE }
    },

    "WEAPON_POOLSTICK": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.156999, fY: 0.092000, fZ: 0.071999, fRotX: -25.099998, fRotY: 172.899963, fRotZ: -19.899995, ...DEFAULT_FSCALE }
    },

    "WEAPON_KATANA": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.058000, fY: 0.008000, fZ: -0.109000, fRotX: -27.999998, fRotY: 155.100036, fRotZ: 172.699966, ...DEFAULT_FSCALE }
    },

    "WEAPON_CHAINSAW": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.000000, fY: 0.078999, fZ: -0.009000, fRotX: 155.599990, fRotY: 7.200000, fRotZ: 4.800000, ...DEFAULT_FSCALE }
    },

    "WEAPON_DILDO": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.015000, fY: 0.041000, fZ: -0.068000, fRotX: -25.599971, fRotY: 162.900054, fRotZ: -175.300018, ...DEFAULT_FSCALE }
    },

    "WEAPON_DILDO2": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.023999, fY: 0.052999, fZ: -0.041999, fRotX: 157.899978, fRotY: 2.499999, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_VIBRATOR": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.002000, fY: 0.074000, fZ: 0.001000, fRotX: 151.200042, fRotY: 23.000000, fRotZ: -9.100001, ...DEFAULT_FSCALE }
    },

    "WEAPON_VIBRATOR2": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.017999, fY: 0.003999, fZ: -0.047999, fRotX: 168.200012, fRotY: 18.300003, fRotZ: -27.900005, ...DEFAULT_FSCALE }
    },

    "WEAPON_FLOWER": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.176000, fY: 0.000000, fZ: -0.011000, fRotX: -23.399999, fRotY: 160.599990, fRotZ: -6.399995, ...DEFAULT_FSCALE }
    },

    "WEAPON_CANE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.008999, fY: -0.018999, fZ: -0.047999, fRotX: -33.199996, fRotY: 159.900085, fRotZ: 156.399902, ...DEFAULT_FSCALE }
    },

    "WEAPON_GRENADE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.019000, fY: 0.047000, fZ: -0.021000, fRotX: 164.499984, fRotY: 0.000000, fRotZ: -17.599994, ...DEFAULT_FSCALE }
    },

    "WEAPON_TEARGAS": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.034000, fY: 0.063000, fZ: -0.037999, fRotX: 164.500000, fRotY: 14.599996, fRotZ: -4.700009, ...DEFAULT_FSCALE }
    },

    "WEAPON_MOLTOV": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.022999, fY: 0.039000, fZ: -0.125999, fRotX: 165.700012, fRotY: 0.000000, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_COLT45": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.033000, fY: 0.057999, fZ: -0.017999, fRotX: 146.299987, fRotY: 14.999998, fRotZ: -4.700002, ...DEFAULT_FSCALE }
    },

    "WEAPON_SILENCED": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.050999, fY: 0.038000, fZ: -0.021999, fRotX: 144.500015, fRotY: 9.100000, fRotZ: -11.600002, ...DEFAULT_FSCALE }
    },

    "WEAPON_DEAGLE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.041000, fY: 0.038000, fZ: -0.026999, fRotX: 173.899963, fRotY: 0.000000, fRotZ: 1.799999, ...DEFAULT_FSCALE }
    },

    "WEAPON_SHOTGUN": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.000000, fY: 0.089000, fZ: 0.000000, fRotX: 153.500015, fRotY: 10.000001, fRotZ: 4.800000, ...DEFAULT_FSCALE }
    },

    "WEAPON_SAWEDOFF": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.040000, fY: 0.026000, fZ: 0.011000, fRotX: -156.300003, fRotY: 0.000000, fRotZ: 2.600000, ...DEFAULT_FSCALE }
    },

    "WEAPON_SHOTGSPA": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.023000, fY: 0.048999, fZ: -0.013000, fRotX: 172.200012, fRotY: 14.400005, fRotZ: 0.599999, ...DEFAULT_FSCALE }
    },

    "WEAPON_UZI": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.024999, fY: 0.048000, fZ: -0.012000, fRotX: 172.000076, fRotY: -3.099988, fRotZ: -2.099991, ...DEFAULT_FSCALE }
    },

    "WEAPON_MP5": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.005000, fY: 0.065000, fZ: -0.016000, fRotX: 162.399963, fRotY: 9.599999, fRotZ: 8.400000, ...DEFAULT_FSCALE }
    },

    "WEAPON_AK47": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.057999, fY: 0.076999, fZ: -0.023999, fRotX: 162.799942, fRotY: 14.399999, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_M4": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.043999, fY: 0.028999, fZ: -0.038000, fRotX: 167.499969, fRotY: 15.999998, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_TEC9": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.048000, fY: 0.049999, fZ: 0.011000, fRotX: -172.600006, fRotY: -2.299995, fRotZ: 5.999999, ...DEFAULT_FSCALE }
    },

    "WEAPON_RIFLE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.043000, fY: 0.065999, fZ: -0.044999, fRotX: 167.499954, fRotY: 17.399999, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_SNIPER": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.018000, fY: 0.085000, fZ: 0.033000, fRotX: 167.399978, fRotY: 12.200000, fRotZ: -0.299997, ...DEFAULT_FSCALE }
    },

    "WEAPON_SATCHEL": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.022000, fY: 0.087999, fZ: 0.006999, fRotX: 154.899978, fRotY: 20.799997, fRotZ: -0.300001, ...DEFAULT_FSCALE }
    },

    "WEAPON_BOMB": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.047000, fY: 0.057000, fZ: -0.038000, fRotX: 133.699981, fRotY: 17.199989, fRotZ: 2.099999, ...DEFAULT_FSCALE }
    },

    "WEAPON_SPRAYCAN": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.036999, fY: 0.026999, fZ: -0.079999, fRotX: 152.899993, fRotY: 14.900004, fRotZ: -0.400000, ...DEFAULT_FSCALE }
    },

    "WEAPON_FIREEXTINGUISHER": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.004000, fY: 0.061999, fZ: -0.063999, fRotX: 126.599990, fRotY: 33.099998, fRotZ: 2.200000, ...DEFAULT_FSCALE }
    },

    "WEAPON_CAMERA": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.018000, fY: 0.062999, fZ: 0.074999, fRotX: -109.400039, fRotY: 0.000000, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    "WEAPON_PARACHUTE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.018000, fY: 0.062999, fZ: 0.074999, fRotX: -109.400039, fRotY: 0.000000, fRotZ: 0.000000, ...DEFAULT_FSCALE }
    },

    // Cargadores y balas.
    "SMALL_MAGAZINE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.065, fY: 0.029999, fZ: 0.016999, fRotX: 10.800001,  fRotY: -103.099998, fRotZ: 0,        fScaleX: 0.649999, fScaleY: 0.910999, fScaleZ: 0.476999 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.092, fY: 0.038,    fZ: -0.026,   fRotX: -37.200008, fRotY: 82.199996,   fRotZ: 3.499996, fScaleX: 0.649999, fScaleY: 0.910999, fScaleZ: 0.476999 }
    },

    "BIG_MAGAZINE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.064999, fY: 0.035998, fZ: 0.018999, fRotX: 1.599980,   fRotY: -105.499984, fRotZ: 1.800009, fScaleX: 0.649999, fScaleY: 0.910999, fScaleZ: 0.476999 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.092,    fY: 0.038,    fZ: -0.026,   fRotX: -37.200008, fRotY: 82.199996,   fRotZ: 3.499996, fScaleX: 0.649999, fScaleY: 0.910999, fScaleZ: 0.476999 }
    },

    "SMALL_BULLETS": { 
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.047999, fY: 0.058999, fZ: 0.016999,  fRotX: 100.800003,  fRotY: -103.099998, fRotZ: 0,        fScaleX: 0.482998, fScaleY: 0.710998, fScaleZ: 0.414999 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.067999, fY: 0.053999, fZ: -0.006999, fRotX: -110.800018, fRotY: -20.899999,  fRotZ: 3.499995, fScaleX: 0.482998, fScaleY: 0.710998, fScaleZ: 0.414999 }
    },

    "SHOTGUN_BULLETS": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.037999, fY: 0.066998, fZ: 0.016999, fRotX: 100.800003, fRotY: 8.199994, fRotZ: -0.999999, fScaleX: 0.484999, fScaleY: 0.847999, fScaleZ: 0.408999 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.129999, fY: 0.076999, fZ: -0.022999, fRotX: -108.799964, fRotY: 163.299972, fRotZ: 3.499995, fScaleX: 0.484999, fScaleY: 0.847999, fScaleZ: 0.408999 }
    },

    "BIG_BULLETS": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.045999, fY: 0.074998, fZ: 0.016999, fRotX: 100.800003,  fRotY: -3.899986,  fRotZ: 0,        fScaleX: 0.445999, fScaleY: 0.910999, fScaleZ: 0.476999 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.145999, fY: 0.071999, fZ: -0.008,   fRotX: -107.200004, fRotY: 172.799987, fRotZ: 3.499995, fScaleX: 0.445999, fScaleY: 0.910999, fScaleZ: 0.476999 }
    },


    // Electrónica.
    "OLD_PHONE": { 
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: -0.005, fY: -0.01, fZ: -0.024, fRotX: 10.800001, fRotY: 1.499994, fRotZ: 0, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.144999, fY: -0.009999, fZ: 0.027000, fRotX: -23.500009, fRotY: -173.399993, fRotZ: 3.499995, fScaleX: 1, fScaleY: 1, fScaleZ: 1 }
    },

    "PHONE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.086999, fY: 0, fZ: -0.023, fRotX: 98.700004, fRotY: -176.799942, fRotZ: 0, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.067,    fY: 0.004, fZ: 0.005999, fRotX: 73.199989, fRotY: -166.699920, fRotZ: 164.600051, fScaleX: 1, fScaleY: 1, fScaleZ: 1 }
    },

    "RADIO": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.046999, fY: 0.035999, fZ: 0.019,  fRotX: 0, fRotY: 0, fRotZ: 0, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.081999, fY: 0.032999, fZ: -0.017000, fRotX: 170.700042, fRotY: 0.000000, fRotZ: 0.000000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000}
    },

    "PORTABLE_RADIO": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.328999, fY: 0, fZ: 0.024, fRotX: 0.799999, fRotY: -92.299957, fRotZ: -1.2, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.334,    fY: 0.089,    fZ: 0.031,  fRotX: -56.400009, fRotY: -102.799949, fRotZ: -20.700002, fScaleX: 1, fScaleY: 1, fScaleZ: 1 }
    },


    // Comidas. — TODO: aplicar animación 'crry_prtial' a aquellos attachments que se tienen que hacer con dos manos (ej: "MEAT_TRAY_PIZZA_BOX").
    "TOMATO_ORANGE_APPLE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.061, fY: 0.03, fZ: -0.003999, fRotX: 0, fRotY: 0, fRotZ: 0, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.082000, fY: 0.049999, fZ: -0.005000, fRotX: 0, fRotY: 0, fRotZ: 0, fScaleX: 1, fScaleY: 1, fScaleZ: 1 }
    },

    "BANANA": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.074,    fY: 0.005,    fZ: 0.021,     fRotX: 102.900054, fRotY: -1.8,        fRotZ: 101.800003,  fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.098999, fY: 0.045999, fZ: -0.026000, fRotX: -85.700119, fRotY: 5.100001, fRotZ: 82.699996, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 } 
    },

    "HOTDOG": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.062999, fY: 0.033999, fZ: 0,         fRotX: -73.799995, fRotY: 1.799999,    fRotZ: -2.1,        fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.085999, fY: 0.059000, fZ: -0.012000, fRotX: 75.399971, fRotY: -112.899955, fRotZ: -3.599999, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "BURGER": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.058999, fY: 0.053,    fZ: 0.023,     fRotX: 0,          fRotY: 0,           fRotZ: 0,           fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.020000, fY: 0.023999, fZ: -0.037999, fRotX: -6.400002, fRotY: -0.199995, fRotZ: -29.200000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000}
    },

    "TOAST": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.093999, fY: 0.03,     fZ: 0.005,     fRotX: 97.599998,  fRotY: 27.000001,   fRotZ: 0.600000,    fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.103999, fY: 0.055999, fZ: -0.011999, fRotX: 93.099990, fRotY: -140.799957, fRotZ: -0.099999, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "PIZZA_SLICE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.077999, fY: 0.029999, fZ: 0,         fRotX: -44.400024, fRotY: -101.399986, fRotZ: -144.700042, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.082999, fY: 0.044999, fZ: -0.048000, fRotX: -115.200004, fRotY: 36.299995, fRotZ: -7.700000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "WRAP": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.064,    fY: 0.028999, fZ: 0.01,      fRotX: 89.600013,  fRotY: 2.699996,    fRotZ: -102.999992, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.071999, fY: 0.040999, fZ: 0.001999, fRotX: 82.099960, fRotY: 10.199939, fRotZ: 64.199981, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "STEAK": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.077999, fY: 0.019,    fZ: 0.026,     fRotX: -83.899978, fRotY: -21.800004,  fRotZ: -6.100008,   fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.105999, fY: 0.043999, fZ: -0.032000, fRotX: 52.600002, fRotY: 40.300003, fRotZ: 0.000000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "PIZZA": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.245999, fY: 0.021,    fZ: 0.028,     fRotX: 95.599983,  fRotY: -2.999995,   fRotZ: -68.199996,  fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.263999, fY: 0.076999, fZ: 0.007000, fRotX: 55.699989, fRotY: 7.199998, fRotZ: 0.000000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "MEAT_TRAY_PIZZA_BOX": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.227,    fY: 0.032,    fZ: -0.145999, fRotX: -30.799997, fRotY: -102.499969, fRotZ: -9.899991,   fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.152000, fY: 0.034000, fZ: 0.218000, fRotX: 6.200002, fRotY: 103.499992, fRotZ: 0.000000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "BREAD_LOAF": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.108999, fY: 0.071999, fZ: 0,         fRotX: 0,          fRotY: -101.000007, fRotZ: -3.900000,   fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.109999, fY: 0.075999, fZ: -0.023000, fRotX: -30.000000, fRotY: -90.899955, fRotZ: 166.299835, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "FISH_STICK_BOX": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.298999, fY: 0.0369999, fZ: -0.128, fRotX: 0, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.293999, fY: 0.028, fZ: -0.149999, fRotX: -10.19993, fRotY: -4.79999, fRotZ: 4.59999, ...DEFAULT_FSCALE }
    },
    
    "ICE_CREAM_BOX": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.236, fY: -0.0659999, fZ: 0, fRotX: -88.30004, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.215, fY: 1.16415, fZ: 0, fRotX: -104, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE }
    },

    "ICE_CREAM_BARS_BOX": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.232, fY: 0.038, fZ: -0.129, fRotX: 0, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.2759997, fY: 0.026, fZ: -0.151, fRotX: -14.19997, fRotY: 0, fRotZ: 6.89999, ...DEFAULT_FSCALE }
    },

    "CEREAL_BOX": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.476, fY: 0.065, fZ: 0.059999, fRotX: 0.09999, fRotY: -97.80001, fRotZ: 0, ...DEFAULT_FSCALE },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.436999, fY: 0.0759999, fZ: -0.05214, fRotX: -164.6, fRotY: -95.4, fRotZ: -136.5005, ...DEFAULT_FSCALE}
    },


    // Bebidas. — TODO: ver si "SODA_COFFEE" se ajusta bien con el vaso de café.
    "CARTON_MILK_APPLE_ORANGE_JUICE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.02,     fY: 0.051,    fZ: -0.122999, fRotX: 0,           fRotY: 0,          fRotZ: 0,        fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: -0.000000, fY: 0.097000, fZ: 0.106000, fRotX: -13.299987, fRotY: 169.299972, fRotZ: 2.799998, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "MILK_BOTTLE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.03,     fY: 0.057,    fZ: 0.111,     fRotX: -178.599975, fRotY: 9.599999,   fRotZ: 0.899999, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.030000, fY: 0.057000, fZ: 0.111000, fRotX: -178.599975, fRotY: 9.599999, fRotZ: 0.899999, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "BEER_PACK": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.413,    fY: 0,        fZ: 0.057999,  fRotX: 14.399993,   fRotY: -99.199951, fRotZ: 2,        fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.420000, fY: 0.079999, fZ: 0.013999, fRotX: 108.999961, fRotY: -78.799972, fRotZ: -61.300018, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "SODA_COFFEE": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.043999, fY: 0.029998, fZ: 0.016999,  fRotX: 10.800001,   fRotY: -13.199980, fRotZ: 1,        fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND: { bone: BoneIdsEnum.LeftHand, fX: 0.072000, fY: 0.036999, fZ: -0.026000, fRotX: -11.800009, fRotY: 175.100036, fRotZ: 3.000000, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },


    // Utilitarios.
    "GAS_CAN": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.105999, fY: 0.009999, fZ: 0.024999, fRotX: 9.999999, fRotY: -102.099967, fRotZ: 1.799987, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.157999, fY: 0.033000, fZ: 0.000000, fRotX: -41.299972, fRotY: -106.599998, fRotZ: 176.200042, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "COAL_BAG": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.609999, fY:-0.04, fZ: 0.122, fRotX: -0.9, fRotY: -99.9, fRotZ: -2.6, ...DEFAULT_FSCALE },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.605999, fY: 0.070998, fZ: 0.05099, fRotX: 13.89999, fRotY: -96.59999, fRotZ: -161.30049, ...DEFAULT_FSCALE }
    },


    // Mobiliarios. — TODO: aplicar animación 'crry_prtial' a aquellos attachments que se tienen que hacer con dos manos (ej: "RED_CHAIR").
    "GRILL": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0,     fY: -0.679, fZ: 0.028999, fRotX: -108.800018, fRotY: 0,      fRotZ: 86.799995,  fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0, fY: -0.688000, fZ: 0.126999, fRotX: -85.800003, fRotY: 0.000000, fRotZ: 107.099975, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

    "RED_CHAIR": {
        RIGHT_HAND: { bone: BoneIdsEnum.RightHand, fX: 0.021, fY: -0.012, fZ: -0.156,   fRotX: 73.999946,   fRotY: -165.5, fRotZ: -95.099983, fScaleX: 1, fScaleY: 1, fScaleZ: 1 },
        LEFT_HAND:  { bone: BoneIdsEnum.LeftHand,  fX: 0.042000, fY: 0.000000, fZ: 0.179000, fRotX: -81.800079, fRotY: -6.700022, fRotZ: 107.900039, fScaleX: 1.000000, fScaleY: 1.000000, fScaleZ: 1.000000 }
    },

} as const;


export type TAttachObjectKey = keyof typeof OBJECT_ATTACHMENT_CONFIG;

export const getAttachmentData = (attachTag: TAttachObjectKey): IAttachmentConfig => OBJECT_ATTACHMENT_CONFIG[attachTag];