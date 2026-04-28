import type { AvailableApplicationName, IBasePhoneApplication } from "./apps/interfaces";
import type { Phone } from "./domain";

export type PhoneBrand = "Samsung" | "Huawei" | "Xiaomi" | "Apple";
export type PhoneOS = "iOS" | "Android";

export interface IPhoneContact {
    name: string;
    phoneNumber: string;
}

export const PHONE_REGEX = /^\d{7}$/;

export const PHONE_COLORS = ["GRAY", "OLD_GRAY", "ORANGE", "BLUE", "LIGHT-BLUE", "RED-ORANGE", "PINK", "RED", "GREEN", "YELLOW", "SILVER", "WHITE"] as const;
export type PhoneColor = typeof PHONE_COLORS[number];

export type PhoneModelId = "18868" | "330" | "18865" | "18872" | "18866" | "18867" | "18869" | "18870" | "18871" | "18873" | "18874" | "19513";

export const PHONE_MODEL_IDS: Record<PhoneColor, PhoneModelId> = {
    "GRAY":       "18868",
    "OLD_GRAY":   "330",
    "ORANGE":     "18865",
    "BLUE":       "18872",
    "LIGHT-BLUE": "18866",
    "RED-ORANGE": "18867",
    "PINK":       "18869",
    "RED":        "18870",
    "GREEN":      "18871",
    "YELLOW":     "18873",
    "SILVER":     "18874",
    "WHITE":      "19513" 
} as const;


export type PhoneCallId = `${number}-${number}`;

export type PhoneCallType = "receive" | "make";
export type PhoneCallReceivedState = "accepted" | "rejected";
export type PhoneCallState = "ringing" | "active" | "ended";

export interface IPhoneCall {
    uid: number;
    type: PhoneCallType;
    state: PhoneCallReceivedState;
    duration: number;
    members: string[];
}

export interface ICallService {
    isPhoneOnCall(phoneId: string): boolean;
    hasIncomingCall(phoneId: string): boolean;
    getCallId(phoneId: string): PhoneCallId | null;
    initiateCall(callerPhoneId: string, receiverPhoneId: string): void;
    answerCall(phoneId: string): boolean;
    finishCall(callId: PhoneCallId): void;
}

export interface IPhoneFinder {
    getByOwner(owner: string): Phone[];
    getByPhoneNumber(phoneNumber: string): Phone | null;
}

export interface ICallData {
    callerPhoneId: string;
    receiverPhoneId: string;
    state: PhoneCallState;
    startTime?: number;
}




export interface IPhone {
    id: string;
    /* Identificativo (iPhone 16 de Ray) */
    owner: string;

    brand: PhoneBrand;
    name: string;

    phoneNumber: string;

    operatingSystem: {
        name: PhoneOS;
        version: string;
    }

    color: PhoneColor;
    modelId: PhoneModelId;

    battery: number;
    state: "on" | "off";

    contacts: IPhoneContact[];

    // Sistema de llamadas.
    callHistory: IPhoneCall[];

    // Sistema de aplicaciones.
    installedApps: IBasePhoneApplication[];
    applicationsData: { appId: AvailableApplicationName, data: unknown }[];
}


export interface CreatePhoneDTO {
    owner: IPhone["owner"];
    brand: IPhone["brand"];
    name: IPhone["name"];
    //phoneNumber: IPhone["phoneNumber"];
    operatingSystemName: IPhone["operatingSystem"]["name"];
    color: IPhone["color"];
    //modelId: IPhone["modelId"];
}