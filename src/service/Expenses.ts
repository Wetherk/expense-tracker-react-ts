import { Expense } from "../model/Expense";
import store from "../store/redux";

const basePath =
    "https://expense-tracker-12796-default-rtdb.europe-west1.firebasedatabase.app/users";

const getToken = () => store.getState().auth.user.accessToken;
const getUserUid = () => store.getState().auth.user.uid;

let lastCalled: Date | null = null;
const callDelay = 5000;

export const getExpenses = (): Promise<Response> => {
    return new Promise((resolve, reject) => {
        if (!lastCalled) {
            lastCalled = new Date();
            fetch(
                `${basePath}/${getUserUid()}/expenses.json?auth=${getToken()}`
            )
                .then(resolve)
                .catch(reject);
        } else {
            if (new Date().getTime() - lastCalled.getTime() > callDelay) {
                lastCalled = new Date();
                fetch(
                    `${basePath}/${getUserUid()}/expenses.json?auth=${getToken()}`
                )
                    .then(resolve)
                    .catch(reject);
            }
        }
    });
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
