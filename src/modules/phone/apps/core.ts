import type { Player } from "@infernus/core";
import type { IBasePhoneApplication } from "./interfaces";


export abstract class BasePhoneApplication {
    constructor (protected readonly props: IBasePhoneApplication) {}

    get appId() { return this.props.appId; }

    get name() { return this.props.name; }
    get author() { return this.props.author; }
    get version() { return this.props.version; }

    get size() { return this.props.size; }

    abstract run(player: Player): unknown;
    abstract serialize(): unknown;
}