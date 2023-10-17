import { useEffect } from "react";
import {
    Avatar,
    CircularProgress,
    Typography,
    Alert,
    TableContainer,
    TableHead,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Box,
} from "@mui/material";

import { Expense } from "../../model/Expense";
import { getExpenses } from "../../service/Expenses";
import { categoryIconMapping } from "../../model/Category";
import useRequest from "../../hooks/useRequest";

const ExpensesList: React.FC = () => {
    const {
        data: expenses,
        isLoading: expensesLoading,
        error: expensesError,
        sendRequest: fetchExpenses,
    } = useRequest<Expense[]>(getExpenses);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TableContainer
                sx={{
                    maxHeight: "70vh",
                    maxWidth: "95%",
                    border: "1px solid #ccc",
                }}
            >
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Sum</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses &&
                            expenses.map((expense) => (
                                <TableRow
                                    key={expense.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        component="th"
                                        scope="row"
                                    >
                                        <Avatar
                                            sx={{
                                                marginRight: "10px",
                                            }}
                                        >
                                            {
                                                categoryIconMapping[
                                                    expense.category.type
                                                ]
                                            }
                                        </Avatar>
                                        {expense.category.description}
                                    </TableCell>
                                    <TableCell align="right">
                                        {`${expense.amount} ${expense.currency.symbol}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        {expense.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    width: "80%",
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {expensesLoading && <CircularProgress />}
                {!expenses?.length && !expensesLoading && !expensesError && (
                    <Typography variant="h6" color="textSecondary">
                        No expenses found...
                    </Typography>
                )}
                {expensesError && (
                    <Alert sx={{ width: "100%" }} severity="error">
                        {expensesError}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default ExpensesList;
