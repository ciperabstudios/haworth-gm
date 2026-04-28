import type { ICoordinates } from "@utils/interfaces/coordinates";
import type { Prettify } from "@utils/types";

interface IBank {
    id: string;
    name: string;
    coordinates: {
        interior: ICoordinates;
        exterior: ICoordinates;
    }

    // -------------

    balance: number;

    clients: Set<string>;
    atms: Set<string>;

    accounts: Map<string, IBankAccount>;
    loans: Map<string, IBankLoan>;
}

interface IBankConfiguration {
    interestRate: number;
    loanInterestRate: number;
    transferFee: number;
}

interface IBankAccount {
    readonly id: string;
    ownerId: string;

    balance: number;

    // -------------

    createdAt: number;
    updatedAt: number;
}

interface IBankLoan {
    readonly id: string;
    clientId: string;

    principal: number;
    remainingAmount: number;

    interestRate: number;

    // -------------

    createdAt: number;
    dueDate?: number;

    isPaid: boolean;
}

const NORMAL_TYPES = ["deposit", "withdraw", "transfer"] as const;
const LOAN_TYPES = ["loan_request", "loan_payment"] as const;

type NormalType = typeof NORMAL_TYPES[number];
type LoanType = typeof LOAN_TYPES[number];

type BankTransactionType = NormalType | LoanType;

interface IBankTransaction {
    readonly id: string;    
    amount: number;
    type: BankTransactionType;

    // -------------
    fromId?: string;
    toId?: string;

    // -------------
    createdAt: number;
}

interface IBankService {
    deposit(bankId: string, accountId: string, amount: number): boolean;
    withdraw(bankId: string, accountId: string, amount: number): boolean;
    transfer(bankId: string, fromAccountId: string, toAccountId: string, amount: number): boolean;
    applyInterest(bankId: string): void;
}

interface IBankAccountService {
    createAccount(bankId: string, ownerId: string): IBankAccount;
    deleteAccount(bankId: string, accountId: string): boolean;
    getAccount(bankId: string, accountId: string): IBankAccount | null;
}

interface IBankLoanService {
    requestLoan(bankId: string, clientId: string, amount: number): IBankLoan | null;
    repayLoan(bankId: string, loanId: string, amount: number): boolean;
}

interface IBankTransactionService {
    log(bankId: string, transaction: IBankTransaction): void;
    getByClient(bankId: string, clientId: string): IBankTransaction[];
    getAll(bankId: string): IBankTransaction[];
}


interface IBankPolicies {
    canWithdraw(account: IBankAccount, amount: number): boolean;
    canDeposit(amount: number): boolean;
    canTransfer(from: IBankAccount, to: IBankAccount, amount: number): boolean;
}



class BankEntity {
    private _clients: Set<string> = new Set(); 
    private _atms: Set<string> = new Set();

    constructor(private props: Prettify<IBank & IBankConfiguration>) {
        this._clients = new Set(props.clients);
        this._atms = new Set(props.atms);
    };



    get clients() { return this._clients; }
    get atms() { return this._atms; }

    // ---------------------------------------

    assignATM(atmId: string): void {
        if (this._atms.has(atmId)) return;

        this._atms.add(atmId);
    }

    removeATM(atmId: string): boolean {
        return this._atms.delete(atmId);
    }

    // ---------------------------------------

    assignClient(clientId: string): void {
        if (this._clients.has(clientId)) return;

        this._clients.add(clientId);
    }

    removeClient(clientId: string): boolean {
        return this._clients.delete(clientId);
    }

    // ---------------------------------------


}