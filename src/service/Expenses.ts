import { Expense } from "../model/Expense";
import { createExpense } from "../model/Expense";
import store from "../store/redux";

const dummyExpenses: Expense[] = [
    createExpense(250, "food", new Date(2023, 8, 21), "cash", "USD"),
    createExpense(1200, "housing", new Date(2023, 8, 1), "debitCard", "USD"),
    createExpense(60, "entertainment", new Date(2023, 8, 15), "cash", "USD"),
    createExpense(
        300,
        "transportation",
        new Date(2023, 8, 10),
        "creditCard",
        "USD"
    ),
    createExpense(100, "personalCare", new Date(2023, 8, 18), "cash", "USD"),
    createExpense(400, "healthcare", new Date(2023, 8, 20), "debitCard", "USD"),
    createExpense(200, "education", new Date(2023, 8, 22), "creditCard", "USD"),
    createExpense(
        500,
        "savingsAndInvestments",
        new Date(2023, 8, 25),
        "other",
        "USD"
    ),
    createExpense(
        150,
        "debtPayments",
        new Date(2023, 8, 28),
        "debitCard",
        "USD"
    ),
    createExpense(75, "miscellaneous", new Date(2023, 8, 30), "cash", "USD"),
];

export const getExpenses = (): Promise<Expense[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyExpenses);
        }, 1000);
    });
};

export const addExpense = (expense: Expense): Promise<Expense[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([expense, ...store.getState().expenses.items]);
        }, 1000);
    });
};
