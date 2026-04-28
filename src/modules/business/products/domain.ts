import type { IBusinessProduct } from "./interfaces";

export class BusinessProduct {
    constructor(private props: IBusinessProduct) {}

    get uid() { return this.props.uid; }
    get name() { return this.props.name; }
    get price() { return this.props.price; }
    get type() { return this.props.type; }
    get stock() { return this.props.stock; }

    toPrimitive() {
        return structuredClone(this.props);
    }

    hasStock(): boolean {
        return this.props.stock > 0;
    }

    canBeAfforded(money: number) {
        return money >= this.props.price;
    }

    updateName(newName: string) {
        if (newName === "" || newName.trim() === "") throw new Error("Product name can't be empty.");

        this.props.name = newName;
    }

    updatePrice(newPrice: number) {
        if (newPrice < 1) throw new Error(`Product price can't be below 0 (${newPrice}).`);
        if (newPrice >= Number.MAX_SAFE_INTEGER) throw new Error(`Product price can't be that high (${newPrice}).`);

        this.props.price = newPrice;
    }

    updateStock(newStockAmount: number) {
        if (newStockAmount < 0) throw new Error("Stock can't be below 0.");
        if (newStockAmount >= Number.MAX_SAFE_INTEGER) throw new Error(`Stock can't be that high (${newStockAmount}).`);
    }

    clearStock() {
        this.props.stock = 0;
    }
}