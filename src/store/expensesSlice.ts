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
    },
});

const expensesReducer = expensesSlice.reducer;

export const expensesActions = expensesSlice.actions;

export default expensesReducer;
