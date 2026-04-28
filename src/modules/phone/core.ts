import { type Player } from "@infernus/core";
import { logger } from "@logger";
import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import { type Document, type Model } from "mongoose";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";
import { Phone } from "./domain";
import { PHONE_MODEL_IDS, PHONE_REGEX, type CreatePhoneDTO, type ICallData, type ICallService, type IPhone, type IPhoneFinder, type PhoneCallId, type PhoneCallReceivedState, type PhoneColor, type PhoneModelId } from "./interfaces";
import PhoneModel from "./schema";
import { PhoneInterfaceService } from "./dialog";
import { itemRegistry } from "@modules/objects/registry";
import PhoneItemHandler from "./handler";
import phoneItemHandler from "./handler";
import { DEFAULT_APPS } from "./apps/defaultApps";
//import { attachableRegistry, type IAttachable, type IAttachableRepository } from "@modules/attachables/registry";



class PhoneRepository extends MongooseRepository<Phone, IPhone> {
    private callService!: ICallService;
    private phoneFinder!: IPhoneFinder;

    constructor() {
        super(
            PhoneModel as Model<IPhone & Document>,
            (data: IPhone) => new Phone(data, this.callService, this.phoneFinder),
            (entity: Phone) => entity.allProps
        );
    }

    setDependencies(callService: ICallService, phoneFinder: IPhoneFinder) {
        this.callService = callService;
        this.phoneFinder = phoneFinder;
    }
}

// ---------------------------------------------------------------------------


class PhoneService {
    constructor (private readonly repository: CachedRepository<Phone>) {}

    // ---------------------------------------

    async findById(id: string): Promise<Phone | null> {
        return this.repository.findById(id);
    }

    // ---------------------------------------

    async modify<R>(phoneId: string, operation: (phone: Phone) => R): Promise<R | null> {
        return this.repository.modify(phoneId, operation);
    }

    // ---------------------------------------

    private getPhoneModelByColor(color: PhoneColor): PhoneModelId {
        return PHONE_MODEL_IDS[color];
    }

    // ---------------------------------------

    private generateRandomPhoneNumber(): string {
        let phoneNumber = "";

        for (let i = 0; i < 7; i++) {
            phoneNumber += Math.floor(Math.random() * 10);
        }

        return phoneNumber;
    }

    private isValidPhoneNumber(phoneNumber: string): boolean {
        return PHONE_REGEX.test(phoneNumber);
    }

    // ---------------------------------------

    async createPhone(dto: CreatePhoneDTO) {
        const { owner, brand, name, operatingSystemName, color } = dto;

        // Número de teléfono aleatorio.
        let phoneNumber = this.generateRandomPhoneNumber(); 
        let matchingPhone = this.repository.findInCache({ phoneNumber })?.[0];

        // Fuerza bruta para evitar que hayan repetidos.
        while (matchingPhone) {
            phoneNumber = this.generateRandomPhoneNumber();
            matchingPhone = this.repository.findInCache({ phoneNumber })?.[0];
        }

        if (!this.isValidPhoneNumber(phoneNumber)) {
            logger.error(`[PhoneService] Invalid phone number format passed (${phoneNumber}).`)
            return false;
        }

        const data: Omit<IPhone, "id"> = {
            owner, brand, name, phoneNumber, color,
            modelId: this.getPhoneModelByColor(color),
            operatingSystem: {
                name: operatingSystemName,
                version: operatingSystemName === "Android" ? "Android 16" : "iOS 18"
            },
            battery: 100,
            state: "off",
            contacts: [],
            callHistory: [],

            installedApps: DEFAULT_APPS,
            applicationsData: []
        };

        const phone = await this.repository.create(data as any);
        
        return phone;
    }

    async deletePhone(phoneId: string) {
        await this.repository.delete(phoneId);
    }
    
    // ---------------------------------------

    async openInterface(player: Player, phone: Phone) {
        await PhoneInterfaceService.open(player, phone);
    }
}



// ---------------------------------------------------------------------------


class PhoneFinder implements IPhoneFinder {
    constructor (private repository: CachedRepository<Phone>) {}

    getByOwner(owner: string): Phone[] {
        const phones = this.repository.findInCache({ owner });
        return phones;
    }

    getByPhoneNumber(phoneNumber: string): Phone | null {
        const phones = this.repository.findInCache({ phoneNumber });
        return phones[0] || null;
    }
}


// ---------------------------------------------------------------------------




class PhoneCallService implements ICallService {
    private onCall: Map<string, PhoneCallId> = new Map(); // phoneId -> callId.
    private activeCalls: Map<PhoneCallId, ICallData> = new Map(); // callId -> CallData.

    constructor (private repository: CachedRepository<Phone>) {}

    // ---------------------------------------

    /* private getNextRoleUid(faction: Faction): number {
            if (!faction.roles.length) return 1;
    
            const uids = faction.roles.map(roles => roles.uid);
            return Math.max(...uids) + 1;
        } */

    private async getNextCallUid(phoneId: string): Promise<number> {
        const phone = await this.repository.findById(phoneId);
        if (!phone) return -1;
        
        if (!phone.callHistory.length) return 1;

        const uids = phone.callHistory.map(call => call.uid);
        return Math.max(...uids) + 1;
    }


    private async addCallToHistory(call: ICallData, duration: number, state: PhoneCallReceivedState): Promise<void> {
        const callerPhone = this.repository.get(call.callerPhoneId);
        const receiverPhone = this.repository.get(call.receiverPhoneId);

        if (!callerPhone || !receiverPhone) return;

        const members = [callerPhone.phoneNumber, receiverPhone.phoneNumber];

        const callerCallUid = await this.getNextCallUid(call.callerPhoneId);
        const receiverCallUid = await this.getNextCallUid(call.receiverPhoneId);

        await this.repository.modify(call.callerPhoneId, (phone) => {
            phone.addCallToHistory({
                uid: callerCallUid,
                type: "make",
                state, duration, members
            });
        });

        await this.repository.modify(call.receiverPhoneId, (phone) => {
            phone.addCallToHistory({
                uid: receiverCallUid,
                type: "receive",
                state, duration, members
            });
        });

    } 

    // ---------------------------------------

    private finalizeCall(callId: PhoneCallId, call: ICallData): void {
        this.onCall.delete(call.callerPhoneId);
        this.onCall.delete(call.receiverPhoneId);
        this.activeCalls.delete(callId);
    }

    // ---------------------------------------
    
    getCallId(phoneId: string): PhoneCallId | null {
        return this.onCall.get(phoneId) ?? null;
    }

    initiateCall(callerPhoneId: string, receiverPhoneId: string): void {
        const callId = `${callerPhoneId}-${receiverPhoneId}` as PhoneCallId;

        this.onCall.set(callerPhoneId, callId);
        this.onCall.set(receiverPhoneId, callId);

        this.activeCalls.set(callId, {
            callerPhoneId,
            receiverPhoneId,
            state: "ringing"
        });
    }

    answerCall(phoneId: string): boolean {
        const callId = this.onCall.get(phoneId);
        if (!callId) return false;

        const call = this.activeCalls.get(callId);
        if (!call) return false;
        if (call.state !== "ringing") return false;
        if (call.receiverPhoneId !== phoneId) return false;

        call.state = "active";
        return true;
    }

    async finishCall(callId: PhoneCallId): Promise<void> {
        const call = this.activeCalls.get(callId);
        if (!call) return;

        if (call.state === "active" && call.startTime) {
            const callDuration = Math.floor((Date.now() - call.startTime) / 1000); // Segundos.
            await this.addCallToHistory(call, callDuration, "accepted");

            return this.finalizeCall(callId, call);
        }

        if (call.state === "ringing") {
            await this.addCallToHistory(call, 0, "rejected");
            return this.finalizeCall(callId, call);
        }

        this.finalizeCall(callId, call);
    }

    isPhoneOnCall(phoneId: string): boolean {
        const callId = this.onCall.get(phoneId);
        if (!callId) return false;

        const call = this.activeCalls.get(callId);
        return call?.state === "active";
    }

    hasIncomingCall(phoneId: string): boolean {
        const callId = this.onCall.get(phoneId);
        if (!callId) return false;

        const call = this.activeCalls.get(callId);
        return call?.state === "ringing" && call.receiverPhoneId === phoneId;
    }
}


// ---------------------------------------------------------------------------


const phoneDbRepo = new PhoneRepository();
const phoneCacheRepo = new CachedRepository<Phone>(phoneDbRepo, logger, "id");

const phoneCallService = new PhoneCallService(phoneCacheRepo);
const phoneFinder = new PhoneFinder(phoneCacheRepo);

phoneDbRepo.setDependencies(phoneCallService, phoneFinder);

export const phoneService = new PhoneService(phoneCacheRepo);

itemRegistry.register("PHONE", phoneItemHandler);


// ---------------------------------------------------------------------------

/* 
CustomPlayerEvent.onLogin(async ({ player, next }) => {
    await phoneService.loadPlayerPhone(player);
    return next();
});

CustomPlayerEvent.onLogout(async ({ player, next }) => {
    await phoneService.unloadPlayerPhone(player);
    return next();
}); */