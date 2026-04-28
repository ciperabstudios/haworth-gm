import type { CreateCharacterDTO, CreateUserDTO, ICharacter, ICharacterDocument, IUser, IUserDocument } from "@database/index";
import CharacterModel from "@database/schemas/character";
import User from "@database/schemas/user";
import { Player } from "@infernus/core";
import { setDefaultShortcutKeysProps } from "@modules/keys";
import { genCode } from "@modules/server/assets";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import moment from "moment";


moment.locale('es');

export const commandPerms = new Map<Player, boolean>();


type CameraPosition = {
  pos: [number, number, number];
  interpolatePos: [number, number, number];
  interpolateLookAt: [number, number, number];
  interpolateDuration: number;
  lookAtDuration: number;
};

const cameraPositions: CameraPosition[] = [
  {
    pos: [1119.365966, -322.488067, 88.411712],
    interpolatePos: [1016.725463, -300.095703, 79.328186],
    interpolateLookAt: [1021.410766, -301.840820, 79.378059],
    interpolateDuration: 12000,
    lookAtDuration: 5000,
  },
  {
    pos: [2333.896484, -1562.540771, 37.501434],
    interpolatePos: [2273.968505, -1505.614013, 27.236345],
    interpolateLookAt: [2277.296875, -1509.339599, 27.440877],
    interpolateDuration: 12000,
    lookAtDuration: 7000,
  },
  {
    pos: [1829.315673, -1821.879150, 31.098114],
    interpolatePos: [1945.015380, -1885.772949, 16.161285],
    interpolateLookAt: [1941.364013, -1882.397460, 15.638803],
    interpolateDuration: 12000,
    lookAtDuration: 8000,
  },
  {
    pos: [2191.684814, -1762.941040, 14.748232],
    interpolatePos: [2096.956787, -1682.495483, 32.463523],
    interpolateLookAt: [2100.880859, -1685.117919, 30.812946],
    interpolateDuration: 10000,
    lookAtDuration: 8000,
  },
  {
    pos: [2292.072265, -2615.372070, 16.056354],
    interpolatePos: [2189.204101, -2442.735595, 40.934978],
    interpolateLookAt: [2191.520263, -2447.032470, 39.852794],
    interpolateDuration: 10000,
    lookAtDuration: 6000,
  },
  {
    pos: [1672.039306, -21.270223, 38.403202],
    interpolatePos: [1610.476318, 17.104217, 43.948638],
    interpolateLookAt: [1614.373046, 14.126948, 42.973484],
    interpolateDuration: 12000,
    lookAtDuration: 100,
  },
  {
    pos: [1663.974121, -16.213781, 38.506347],
    interpolatePos: [1597.953491, 31.011308, 39.233421],
    interpolateLookAt: [1601.866699, 27.899112, 39.198734],
    interpolateDuration: 12000,
    lookAtDuration: 1000,
  },
  {
    pos: [-539.049377, -534.627014, 40.747604],
    interpolatePos: [-595.371276, -497.121215, 25.747377],
    interpolateLookAt: [-591.365478, -500.095153, 26.078189],
    interpolateDuration: 12000,
    lookAtDuration: 5000,
  },
  {
    pos: [2286.952148, -1393.432128, 26.616624],
    interpolatePos: [2287.145263, -1284.567626, 25.910959],
    interpolateLookAt: [2287.173583, -1289.555175, 25.558712],
    interpolateDuration: 9000,
    lookAtDuration: 500,
  },
];


export function setCameraRandomLogin(player: Player): void {
  const randomIndex = Math.floor(Math.random() * cameraPositions.length);
  const camera = cameraPositions[randomIndex];

  player.setPos(...camera.pos);
  player.interpolateCameraPos(...camera.pos, ...camera.interpolatePos, camera.interpolateDuration);
  player.interpolateCameraLookAt(...camera.pos, ...camera.interpolateLookAt, camera.lookAtDuration);
  player.setVirtualWorld(player.id + 247);
}





export const EMAIL_REGEX = /^(?:[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|icloud)\.com)$/i;

export const createAccount = async (dto: CreateUserDTO): Promise<IUserDocument> => {
    const { name, email, password } = dto;

    // NOTE: Solo permite Gmail, Outlook, Hotmail o iCloud.
    

    /* if (!emailRegex.test(email)) {
      req.flash('error', 'La dirección de correo electrónico debe ser de Gmail, Outlook, Hotmail o iCloud.');
      return res.redirect('/auth/signup');
    } */

    const [userFound, emailFound] = await Promise.all([
        User.findOne({ name }),
        User.findOne({ email })
    ]);

    /* if (userFound) {
      req.flash('error', 'El nombre de usuario introducido ya existe.');
      return res.redirect('/auth/signup');
    }

    if (emailFound) {
      req.flash('error', 'El correo electrónico proporcionado ya está en uso.');
      return res.redirect('/auth/signup');
    } */

    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Encriptar email.
    // ...

    const dateNow = Date.now().toString(); // TODO: Cambiar tipo a number.

    const data: IUser = {
        id: randomUUID(),
        name, email,
        password: hashedPassword,
        registrationDate: dateNow,
        email_token_verification: genCode(128),
        email_verified: false,
        lastConnection: dateNow,
        role: 1,
        lastConnections: [dateNow],
        characters: [],
        privacy: true,
        discord_uuid: null
    };

    const account = await User.create(data);
    return account;
}


function generateCharacterId() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  return Array.from({ length: 2 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('') +
         Array.from({ length: 4 }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');
}


export const createCharacter = async (accountID: string, dto: CreateCharacterDTO): Promise<ICharacterDocument> => {
    const { name, genre, profile } = dto;

    let characterID;
    while (true) {
        characterID = generateCharacterId();
        const exists = await CharacterModel.exists({ ID: characterID });
        if (!exists) break;
    }

    const data: ICharacter = {
        ID: characterID,

        accountID, name, genre, profile,

        health: 100,
        kevlar: 0,

        level: {
            actual: 1,
            points: 0,
            totalPoints: 20
        },

        skin: {
            id: genre === "male" ? 2 : 41
        },

        currency: {
            cash: 0
        },

        shortcutKeys: setDefaultShortcutKeysProps(),

        coordinates: {
            x: 1483.50537109375,
            y: -1667.3194580078125,
            z: 14.553216934204102,
            interior: 0,
            virtualWorld: 0,
            camera: {
                x: 0,
                y: 0,
                z: 0
            }
        },

        lastConnection: Date.now(),

        pdr: []
    };

    const character = await CharacterModel.create(data);
    return character;
}