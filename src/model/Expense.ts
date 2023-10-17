import { v4 } from "uuid";

import { Category, ExpenseCategory } from "./Category";
import { PaymentMethod } from "./PaymentMethod";
import { Currency, ExpenseCurrency } from "./Currency";
import { formatDate } from "../utils/formatters";

export class Expense {
    id: string;
    amount: number;
    date: string;
    paymentMethod: PaymentMethod;
    category: ExpenseCategory;
    currency: ExpenseCurrency;

    constructor(
        amount: number,
        category: Category,
        date: Date,
        paymentMethod: PaymentMethod,
        currency: Currency
    ) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;

        this.category = new ExpenseCategory(category);
        this.currency = new ExpenseCurrency(currency);

        this.date = formatDate(date);
        this.id = v4();
    }
}
