import type { IBasePhoneApplication } from "./interfaces";

export const DEFAULT_APPS: IBasePhoneApplication[] = [
    {
        appId: "notes",
        name: "Notas",
        author: "Sistema",
        version: "1.0.0",
        size: 4096
    }
] as const;