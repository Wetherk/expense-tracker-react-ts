import { Expense } from "../model/Expense";
import store from "../store/redux";

const basePath =
    "https://expense-tracker-12796-default-rtdb.europe-west1.firebasedatabase.app/";

export const getExpenses = (): Promise<Response> => {
    return fetch(`${basePath}/expenses.json`);
};

export const parseExpenses = (responseData: object | null) => {
    if (responseData === null) return [];

    return Object.entries(responseData).map(([id, expenseData]) => ({
        id,
        ...expenseData,
    }));
};

export const addExpense = (expense: Expense): Promise<Expense[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([expense, ...store.getState().expenses.items]);
        }, 1000);
    });
};
