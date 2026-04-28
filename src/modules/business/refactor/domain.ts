import type { ICoordinates } from "@utils/interfaces/coordinates";
import type { Player } from "@infernus/core";
import { logger } from "@logger";
import type { IBusiness } from "./interfaces";
import { BusinessProduct, type IBusinessProduct, type ProductType } from "../products";


export class Business {
    private _products: BusinessProduct[] = [];

    constructor(private props: IBusiness) {
        if (props.products) this._products = props.products.map(p => new BusinessProduct(p));
    };

    get id() { return this.props.id };
    get name() { return this.props.name };
    get price() { return this.props.price };
    get owner() { return this.props.owner };
    get available() { return this.props.available };
    get interiorCoords() { return structuredClone(this.props.coordinates.interior); };
    get exteriorCoords() { return structuredClone(this.props.coordinates.exterior); };

    get products(): BusinessProduct[] {
        return [...this._products];
    }

    get allProps(): IBusiness {
        const propsCopy = structuredClone(this.props);

        propsCopy.products = this._products.map(p => p.toPrimitive());

        return propsCopy;
    }


    enter(player: Player): boolean {
        const { x, y, z, int, vw } = this.props.coordinates.interior;

        player.setInterior(int);
        player.setVirtualWorld(vw);
        player.setPos(x, y, z);

        return true;
    }

    exit(player: Player): boolean {
        const { x, y, z, int, vw } = this.props.coordinates.exterior;

        player.setInterior(int);
        player.setVirtualWorld(vw);
        player.setPos(x, y, z);

        return true;
    }


    isPlayerNear(player: Player, range: number = 2.0): boolean {
        const { x, y, z, vw } = this.props.coordinates.exterior;

        return player.isInRangeOfPoint(range, x, y, z) && player.getVirtualWorld() == vw; 
    }

    isPlayerIn(player: Player): boolean {
        const { int, vw } = this.props.coordinates.interior;

        return player.getInterior() == int && player.getVirtualWorld() == vw;
    }

    canBeBought(money: number): boolean {
        return this.props.available && money >= this.props.price;
    }

    setName(newName: string) {
        return (this.props.name = newName);
    }

    setAvailability(newAvailability: boolean) {
        if (this.props.owner) {
            logger.warn("No se puede cambiar la disponibilidad del negocio si hay un dueño activo.");
            return false;
        }

        return (this.props.available = newAvailability);
    }

    setPrice(newPrice: number) {
        this.props.price = newPrice;
    }

    setOwner(newOwnerName: string | null) {
        this.props.owner = newOwnerName;
        this.props.available = !newOwnerName;

        return true;
    }

    setInteriorCoordinates(newCoordinates: ICoordinates) {
        this.props.coordinates.interior = newCoordinates;

        return true;
    }

    setExteriorCoordinates(newCoordinates: ICoordinates) {
        this.props.coordinates.exterior = newCoordinates;

        return true;
    }


    // -----------------------------------------

    getProduct(uid: number): BusinessProduct | undefined {
        return this._products.find(p => p.uid === uid);
    }

    addProduct(name: string, price: number, type: ProductType, stock: number = -1): BusinessProduct {
        const maxUid = this._products.reduce((max, p) => (p.uid > max ? p.uid : max), -1);
        const newUid = maxUid + 1;

        const rawProduct: IBusinessProduct = {
            uid: newUid,
            name, price, type, stock
        };

        const newProduct = new BusinessProduct(rawProduct);

        this._products.push(newProduct);

        return newProduct;
    }

    removeProduct(uid: number): boolean {
        const index = this._products.findIndex(p => p.uid === uid);
        if (index === -1) return false;

        this._products.splice(index, 1);
        return true;
    }

    purchaseProduct(uid: number, money: number): BusinessProduct | null {
        const product = this.getProduct(uid);

        if (!product) return null;

        if (!product.canBeAfforded(money)) return null;
        if (!product.hasStock()) return null;

        product.updateStock(product.stock - 1);

        return product;
    }
}



