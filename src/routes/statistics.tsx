import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import ExpensesPieChart from "../components/Expenses/ExpensesPieChart";
import useRequest from "../hooks/useRequest";
import {
    getCurrencyRates,
    parseCurrencyRates,
} from "../service/CurrencyConversionRate";
import { CurrencyRates } from "../model/Currency";
import { AppDispatch, RootState } from "../store/redux";
import { expensesActions } from "../store/expensesSlice";
import { getExpenses, parseExpenses } from "../service/Expenses";
import { Expense } from "../model/Expense";

const Statistics: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const reduxExpenses = useSelector(
        (state: RootState) => state.expenses.items
    );
    const reduxRates = useSelector(
        (state: RootState) => state.expenses.currencyRates
    );

    const {
        data: rates,
        isLoading: ratesLoading,
        error: ratesError,
        sendRequest: fetchCurrencyRates,
    } = useRequest<CurrencyRates>(getCurrencyRates, parseCurrencyRates);

    const {
        data: expenses,
        isLoading: expensesLoading,
        error: expensesError,
        sendRequest: fetchExpenses,
    } = useRequest<Expense[]>(getExpenses, parseExpenses);

    useEffect(() => {
        fetchCurrencyRates();
        fetchExpenses();
    }, [fetchCurrencyRates, fetchExpenses]);

    useEffect(() => {
        if (rates) {
            dispatch(expensesActions.setCurrencyRates(rates));
        }
    }, [rates, dispatch]);

    useEffect(() => {
        if (expenses) {
            dispatch(expensesActions.setExpenses(expenses));
        }
    }, [expenses, dispatch]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            {(!reduxExpenses || !Object.keys(reduxRates).length) &&
                (expensesLoading || ratesLoading) && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress size="5rem" />
                        <Typography variant="h6" color="textSecondary">
                            Loading, please wait...
                        </Typography>
                    </Box>
                )}
            {reduxExpenses && !!Object.keys(reduxRates).length && (
                <ExpensesPieChart />
            )}
            {expensesError && <Alert severity="error">{expensesError}</Alert>}
            {ratesError && <Alert severity="error">{ratesError}</Alert>}
        </Box>
    );
};

export default Statistics;
