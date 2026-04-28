import type { BasePhoneApplication } from "./core";
import type { AvailableApplicationName, IBasePhoneApplication } from "./interfaces";
import NotesApplication from "./notesApplication";


export default class ApplicationFactory {
    private static registry: Record<AvailableApplicationName, new (props: IBasePhoneApplication, savedData?: any) => BasePhoneApplication> = {
        "notes": NotesApplication
    };
    

    static create(appId: AvailableApplicationName, props: IBasePhoneApplication, savedData?: any): BasePhoneApplication | null {
        const AppClass = this.registry[appId];
        return AppClass ? new AppClass(props, savedData) : null;
    }

    static createMultiple(applications: IBasePhoneApplication[], applicationsData: { appId: AvailableApplicationName, data: any }[]): Map<AvailableApplicationName, BasePhoneApplication> {
        const apps: Map<AvailableApplicationName, BasePhoneApplication> = new Map();

        applications.forEach(appMetadata => {
            const savedData = applicationsData.find(ad => ad.appId === appMetadata.appId);

            const app = this.create(appMetadata.appId, appMetadata, savedData?.data);
            if (app) apps.set(appMetadata.appId, app);
        });

        return apps;
    }
}