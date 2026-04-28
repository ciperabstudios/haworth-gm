import type { Player } from "@infernus/core";
import type { BasePhoneApplication } from "./apps/core";
import type { ICallService, IPhone, IPhoneCall, IPhoneContact, IPhoneFinder, PhoneBrand, PhoneColor, PhoneOS } from "./interfaces";
import { PHONE_REGEX } from "./interfaces";
import ApplicationFactory from "./apps/factory";
import type { AvailableApplicationName, IBasePhoneApplication } from "./apps/interfaces";


export class Phone {
    private applicationInstances: Map<AvailableApplicationName, BasePhoneApplication> = new Map();

    constructor(
        private props: IPhone,
        private callService: ICallService,
        private phoneFinder: IPhoneFinder
    ) {
        this.loadApplications();
        //this.props.applications = ApplicationFactory.createMultiple()
    }

    get id() { return this.props.id; }
    get brand() { return this.props.brand; }
    get name() { return this.props.name; }
    get owner() { return this.props.owner; }
    get phoneNumber() { return this.props.phoneNumber; }
    get operatingSystem() { return structuredClone(this.props.operatingSystem); }
    get color() { return this.props.color; }
    get modelId() { return this.props.modelId; }
    get battery() { return this.props.battery; }
    get state() { return this.props.state; }
    get contacts() { return structuredClone(this.props.contacts); }
    get callHistory() { return structuredClone(this.props.callHistory); }

    // ---------------------------------------

    get allProps() {
        this.saveApplicationsData();
        return structuredClone(this.props);
    }

    // ---------------------------------------

    private loadApplications(): void {
        this.applicationInstances = ApplicationFactory.createMultiple(this.props.installedApps, this.props.applicationsData);
    }

    // ---------------------------------------

    isValidPhoneNumber(phoneNumber: string): boolean {
        return PHONE_REGEX.test(phoneNumber);
    }

    isIPhone() {
        return this.props.operatingSystem.name === "iOS" && this.props.brand === "Apple";
    }

    // ---------------------------------------

    changeBrand(newBrandName: PhoneBrand) {
        if (this.isIPhone()) return;

        this.props.brand = newBrandName;
    }

    changeName(newName: string) {
        this.props.name = newName;
    }

    changePhoneNumber(newPhoneNumber: string) {
        if (!this.isValidPhoneNumber(newPhoneNumber)) return;
        
        this.props.phoneNumber = newPhoneNumber;
    }

    changeOperatingSystem(newOperatingSystem: { name: PhoneOS, version: string }) {
        this.props.operatingSystem = newOperatingSystem;
    }

    changeColor(newColor: PhoneColor) {
        this.props.color = newColor;
    }

    // ---------------------------------------

    decreaseBattery(amount: number = 1) {
        if (this.props.battery <= 0) return;
        if (this.props.state === "off") return;

        this.props.battery -= amount;
        if (!this.props.battery) this.props.state = "off";
    }

    increaseBattery(amount: number = 1) {
        if (this.props.battery >= 100) return;

        this.props.battery += amount;
    }

    // ---------------------------------------

    turnOn() {
        this.props.state = "on";
    }

    turnOff() {
        this.props.state = "off";
    }

    // ---------------------------------------

    contactPhoneNumberExists(phoneNumber: string): boolean {
        if (!this.isValidPhoneNumber(phoneNumber)) return false;

        return this.props.contacts.some(c => c.phoneNumber === phoneNumber);
    }

    contactNameExists(name: string): boolean {
        return this.props.contacts.some(c => c.name === name);
    }

    // ---------------------------------------

    addContact(newContact: IPhoneContact) {
        const { name, phoneNumber } = newContact;

        if (this.contactPhoneNumberExists(phoneNumber) || this.contactNameExists(name)) return false;

        this.props.contacts.push(newContact);
        return true;
    }

    removeContact(contactName: string) {
        if (!this.contactNameExists(contactName)) return;

        this.props.contacts = this.props.contacts.filter(c => c.name !== contactName);
    }

    changeContactName(oldContactName: string, newContactName: string) {
        if (!this.contactNameExists(oldContactName) || this.contactNameExists(newContactName)) return;

        const contact = this.props.contacts.find(c => c.name === oldContactName);
        if (contact) contact.name = newContactName;
    }

    changeContactPhoneNumber(contactName: string, newPhoneNumber: string) {
        if (!this.contactNameExists(contactName)) return;
        if (!this.isValidPhoneNumber(newPhoneNumber)) return;

        const contact = this.props.contacts.find(c => c.name === contactName);
        if (contact) contact.phoneNumber = newPhoneNumber;
    }

    // ---------------------------------------

    addCallToHistory(call: IPhoneCall) {
        this.props.callHistory.push(call);
    }

    removeCallFromHistory(callUid: number) {
        this.props.callHistory = this.props.callHistory.filter(c => c.uid !== callUid);
    }

    // ---------------------------------------


    call(phoneNumber: string): boolean {
        if (!this.isValidPhoneNumber(phoneNumber)) return false;
        if (this.props.state === "off" || this.props.battery <= 0) return false;
        if (this.callService.isPhoneOnCall(this.id)) return false;

        const targetPhone = this.phoneFinder.getByPhoneNumber(phoneNumber);
        if (!targetPhone) return false;
        if (targetPhone.state === "off" || targetPhone.battery <= 0) return false;
        if (this.callService.isPhoneOnCall(targetPhone.id)) return false;

        this.callService.initiateCall(this.id, targetPhone.id);
        return true;
    }

    answerCall(): boolean {
        if (this.state === "off" || this.battery <= 0) return false;
        if (!this.callService.hasIncomingCall(this.id)) return false;

        return this.callService.answerCall(this.id);
    }

    hangUp(): boolean {
        const callId = this.callService.getCallId(this.id);
        if (!callId) return false;

        this.callService.finishCall(callId);
        return true;
    }

    // ---------------------------------------

    installApplication(appData: IBasePhoneApplication): boolean {
        if (this.props.installedApps.some(app => app.appId === appData.appId)) return false;

        this.props.installedApps.push(appData);

        const appInstance = ApplicationFactory.create(appData.appId, appData);
        if (!appInstance) return false;

        this.applicationInstances.set(appData.appId, appInstance);
        return true;
    }

    uninstallApplication(appId: AvailableApplicationName): boolean {
        const index = this.props.installedApps.findIndex(app => app.appId === appId);
        if (index === -1) return false;

        // Remover metadata.
        this.props.installedApps.splice(index, 1);
        
        // Remover datos.
        this.props.applicationsData = this.props.applicationsData.filter(ad => ad.appId !== appId);

        // Remover instancia.
        this.applicationInstances.delete(appId);

        return true;
    }

    getApplication(appId: AvailableApplicationName): BasePhoneApplication | undefined {
        return this.applicationInstances.get(appId);
    }

    listInstalledApps(): IBasePhoneApplication[] {
        return structuredClone(this.props.installedApps);
    }

    async runApplication(appId: AvailableApplicationName, player: Player): Promise<boolean> {
        const app = this.applicationInstances.get(appId);
        if (!app) return false;

        await app.run(player);
        return true;
    }

    // ---------------------------------------

    private saveApplicationsData(): void {
        this.props.applicationsData = [];

        this.applicationInstances.forEach((app, appId) => {
            this.props.applicationsData.push({
                appId,
                data: app.serialize()
            });
        });
    }

    // ---------------------------------------
}