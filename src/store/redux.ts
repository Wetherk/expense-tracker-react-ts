import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expensesReducer from "./expensesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
