import { Expense } from "../model/Expense";
import store from "../store/redux";

const basePath =
    "https://expense-tracker-12796-default-rtdb.europe-west1.firebasedatabase.app/users";

const getToken = () => store.getState().auth.user.accessToken;
const getUserUid = () => store.getState().auth.user.uid;

export const getExpenses = (): Promise<Response> => {
    return fetch(
        `${basePath}/${getUserUid()}/expenses.json?auth=${getToken()}`
    );
};

export const parseExpenses = (responseData: object | null) => {
    if (responseData === null) return [];

    return Object.entries(responseData).map(([id, expenseData]) => ({
        id,
        ...expenseData,
    }));
};

export const addExpense = (expense: Expense): Promise<Expense[]> => {
    return new Promise((resolve, reject) => {
        fetch(`${basePath}/${getUserUid()}/expenses.json?auth=${getToken()}`, {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (response) => {
                const parsedResponse = await response.json();
                expense.id = parsedResponse.name;
                resolve([expense, ...store.getState().expenses.items]);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const removeExpense = (expenseId: string) => {
    return fetch(
        `${basePath}/${getUserUid()}/expenses/${expenseId}.json?auth=${getToken()}`,
        {
            method: "DELETE",
        }
    );
};
