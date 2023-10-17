import { v4 } from "uuid";

import { ExpenseCategory } from "./Category";
import { PaymentMethod } from "./PaymentMethod";
import {
    Currency,
    currencySymbolMapping,
    currencyFullNameMapping,
} from "./Currency";
import { formatDate } from "../utils/formatters";

export class Expense {
    id: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    paymentMethod: PaymentMethod;
    currency: string;
    currencySymbol: string;
    currencyName: string;

    constructor(
        amount: number,
        category: ExpenseCategory,
        date: Date,
        paymentMethod: PaymentMethod,
        currency: Currency
    ) {
        this.amount = amount;
        this.category = category;
        this.paymentMethod = paymentMethod;

        this.currency = currencySymbolMapping[currency];
        this.currencyName = currencyFullNameMapping[currency];
        this.currencySymbol = this.date = formatDate(date);
        this.id = v4();
    }
}
