import { useEffect, useState } from "react";
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
    Button,
    Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Expense } from "../../model/Expense";
import { getExpenses, parseExpenses } from "../../service/Expenses";
import { categoryIconMapping } from "../../model/Category";
import useRequest from "../../hooks/useRequest";
import { AppDispatch, RootState } from "../../store/redux";
import { expensesActions } from "../../store/expensesSlice";
import { paymentMethodDescriptionMapping } from "../../model/PaymentMethod";
import NewExpenseDialog from "./NewExpenseDialog";

const ExpensesList: React.FC = () => {
    const [newExpenseDialogOpen, setNewExpenseDialogOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const storedExpenses = useSelector(
        (state: RootState) => state.expenses.items
    );

    const {
        data: expenses,
        isLoading: expensesLoading,
        error: expensesError,
        sendRequest: fetchExpenses,
    } = useRequest<Expense[]>(getExpenses, parseExpenses);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    useEffect(() => {
        if (expenses) {
            dispatch(expensesActions.setExpenses(expenses));
        }
    }, [expenses, dispatch]);

    const handleOpen = () => {
        setNewExpenseDialogOpen(true);
    };

    const handleClose = () => {
        setNewExpenseDialogOpen(false);
    };

    return (
        <>
            <NewExpenseDialog
                open={newExpenseDialogOpen}
                onClose={handleClose}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        width: "100%",
                        outline: "1px solid #ccc",
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h5"
                        component="div"
                    >
                        Expenses
                    </Typography>
                    <Button onClick={handleOpen} variant="contained">
                        Create
                    </Button>
                </Toolbar>
                <TableContainer
                    sx={{
                        outline: "1px solid #ccc",
                    }}
                >
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell align="right">Sum</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {storedExpenses &&
                                storedExpenses.map((expense) => (
                                    <TableRow
                                        key={expense.id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
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
                                        <TableCell>
                                            {
                                                paymentMethodDescriptionMapping[
                                                    expense.paymentMethod
                                                ]
                                            }
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
                    {!storedExpenses?.length && expensesLoading && (
                        <CircularProgress />
                    )}
                    {!expenses?.length &&
                        !expensesLoading &&
                        !expensesError && (
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
        </>
    );
};

export default ExpensesList;
