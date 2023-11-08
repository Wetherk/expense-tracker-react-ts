import { Category, expenseCategoryDescriptionMapping } from "./Category";
import { PaymentMethod } from "./PaymentMethod";
import {
    Currency,
    currencyFullNameMapping,
    currencySymbolMapping,
} from "./Currency";
import { formatDate } from "../utils/formatters";

export type Expense = {
    id?: string;
    amount: number;
    date: string;
    paymentMethod: PaymentMethod;
    category: {
        type: Category;
        description: string;
    };
    currency: {
        currency: Currency;
        symbol: string;
        name: string;
    };
};

export const createExpense = (
    amount: number,
    category: Category,
    date: Date,
    paymentMethod: PaymentMethod,
    currency: Currency
): Expense => {
    return {
        amount,
        paymentMethod,
        category: {
            type: category,
            description: expenseCategoryDescriptionMapping[category],
        },
        currency: {
            currency,
            symbol: currencySymbolMapping[currency],
            name: currencyFullNameMapping[currency],
        },
        date: formatDate(date),
    };
};
