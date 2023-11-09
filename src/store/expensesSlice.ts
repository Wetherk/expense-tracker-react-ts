import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense } from "../model/Expense";

interface ExpensesState {
    items: Expense[];
}

const initialState: ExpensesState = {
    items: [],
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
    },
});

const expensesReducer = expensesSlice.reducer;

export const expensesActions = expensesSlice.actions;

export default expensesReducer;
