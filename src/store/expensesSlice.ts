import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense } from "../model/Expense";
import { Currency } from "../model/Currency";

interface ExpensesState {
    items: Expense[];
    baseCurrency: Currency;
}

const initialState: ExpensesState = {
    items: [],
    baseCurrency: "USD",
};

const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        setExpenses(state, action: PayloadAction<Expense[]>) {
            state.items = action.payload;
        },
        removeExpenses(state, action: PayloadAction<string[]>) {
            let expensesToSet = state.items;
            action.payload.forEach(
                (expenseId) =>
                    (expensesToSet = expensesToSet.filter(
                        ({ id }) => id !== expenseId
                    ))
            );

            state.items = expensesToSet;
        },
        setBaseCurrency(state, action: PayloadAction<Currency>) {
            state.baseCurrency = action.payload;
        },
    },
});

const expensesReducer = expensesSlice.reducer;

export const expensesActions = expensesSlice.actions;

export default expensesReducer;
