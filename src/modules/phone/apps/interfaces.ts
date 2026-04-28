export type AvailableApplicationName = "notes";

export interface IBasePhoneApplication {
    appId: AvailableApplicationName;
    name: string;
    author: string;
    version: string;

    // Metadata.
    size: number;
}
