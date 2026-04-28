import { Dialog, DialogStylesEnum, Player, type IDialog, type IDialogResCommon } from "@infernus/core";

type ValidStyle = Extract<keyof typeof DialogStylesEnum, "TABLIST" | "TABLIST_HEADERS">;

/* interface IPaginatedDialog extends Omit<Required<IDialog>, "style" | "info"> {
    style: ValidStyle;
    info: string[];
} */

type BasePaginatedDialog = Omit<IDialog, "style" | "info"> & {
  info: string[];
};

interface ListDialog extends BasePaginatedDialog {
    style: "LIST";
}

interface TablistDialog extends BasePaginatedDialog {
    style: "TABLIST";
}

interface TablistHeadersDialog extends BasePaginatedDialog {
    style: "TABLIST_HEADERS";
    headers: string;
}


interface IPaginatedDialogExtra {
    itemsPerPage: number;
}

export type IPaginatedDialog =
  | ListDialog
  | TablistDialog
  | TablistHeadersDialog;


export class PaginatedDialog {
    private ITEMS_PER_PAGE = 10;
    private TOTAL_PAGES = 0;

    private NEXT_PAGE_OPTION = "{FF6359}>>";
    private PREV_PAGE_OPTION = "{FF6359}<<";

    private currentPage = 0;

    constructor(private props: IPaginatedDialog, extra?: Partial<IPaginatedDialogExtra>) {
        if (extra) {
            if (extra.itemsPerPage) this.ITEMS_PER_PAGE = extra.itemsPerPage;
        }
        
        const items = props.info.length;
        this.TOTAL_PAGES = Math.ceil(items / this.ITEMS_PER_PAGE);
    }

    private getActualPage(): number {
        return this.currentPage;
    }

    private setNextPage() {
        this.currentPage = (this.currentPage + 1) % this.TOTAL_PAGES;
    }

    private setPreviousPage() {
        this.currentPage = (this.currentPage - 1 + this.TOTAL_PAGES) % this.TOTAL_PAGES;
    }

    // --------------------------------------------------------

    private getPageInfo(): string {
        const options = `${this.NEXT_PAGE_OPTION}\n${this.PREV_PAGE_OPTION}`;

        const start = this.getActualPage() * this.ITEMS_PER_PAGE;
        const itemsArr = this.props.info.slice(start, start + this.ITEMS_PER_PAGE);

        if (this.props.info.length <= this.ITEMS_PER_PAGE) return itemsArr.join("\n");

        return itemsArr.join("\n") + "\n" + options;
    }

    private getRealItemsCount(): number {
        const start = this.currentPage * this.ITEMS_PER_PAGE;

        const realItemsCount = Math.min(
            this.ITEMS_PER_PAGE,
            this.props.info.length - start
        );

        return realItemsCount;
    }


    private createDialog(): Dialog {
        const pageCaption = ` (pág. ${this.getActualPage() + 1}/${this.props.info.length <= this.ITEMS_PER_PAGE ? 1 : this.TOTAL_PAGES})`;

        const info = this.props.style === "TABLIST" || this.props.style === "LIST"
                        ? this.getPageInfo() 
                        : `${this.props.headers}\n${this.getPageInfo()}`;

        return new Dialog({
            ...this.props,
            style: DialogStylesEnum[this.props.style],
            caption: this.props.caption + pageCaption,
            info
        });
    }

    async show(player: Player): Promise<IDialogResCommon> {
        while (true) {
            const dialog = this.createDialog();

            const ret = await dialog.show(player);
            const { response, listItem } = ret;

            if (!response) return ret;

            if (listItem >= this.getRealItemsCount()) {
                listItem === this.getRealItemsCount()
                    ? this.setNextPage()      // >>
                    : this.setPreviousPage(); // <<   
                continue;
            }

            return {
                ...ret,
                listItem: this.getSelectedIndex(listItem)
            };
        }
    }

    private getSelectedIndex(localIndex: number): number {
        return this.currentPage * this.ITEMS_PER_PAGE + localIndex;
    }

}