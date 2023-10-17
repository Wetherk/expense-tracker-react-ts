import { Expense } from "../model/Expense";
const dummyExpenses: Expense[] = [
    new Expense(250, "food", new Date(2023, 8, 21), "cash", "USD"),
    new Expense(1200, "housing", new Date(2023, 8, 1), "debitCard", "USD"),
    new Expense(60, "entertainment", new Date(2023, 8, 15), "cash", "USD"),
    new Expense(
        300,
        "transportation",
        new Date(2023, 8, 10),
        "creditCard",
        "USD"
    ),
    new Expense(100, "personalCare", new Date(2023, 8, 18), "cash", "USD"),
    new Expense(400, "healthcare", new Date(2023, 8, 20), "debitCard", "USD"),
    new Expense(200, "education", new Date(2023, 8, 22), "creditCard", "USD"),
    new Expense(
        500,
        "savingsAndInvestments",
        new Date(2023, 8, 25),
        "other",
        "USD"
    ),
    new Expense(150, "debtPayments", new Date(2023, 8, 28), "debitCard", "USD"),
    new Expense(75, "miscellaneous", new Date(2023, 8, 30), "cash", "USD"),
];

export const getExpenses = (): Promise<Expense[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyExpenses);
        }, 1000);
    });
};
