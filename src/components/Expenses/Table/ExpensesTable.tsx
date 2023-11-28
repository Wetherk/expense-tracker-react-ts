import React, { useEffect, useState } from "react";
import {
    Avatar,
    CircularProgress,
    Typography,
    Alert,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Box,
    Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Expense } from "../../../model/Expense";
import {
    getExpenses,
    parseExpenses,
    removeExpense,
} from "../../../service/Expenses";
import { currencySymbolMapping } from "../../../model/Currency";
import { convertToBaseCurrency } from "../../../service/CurrencyConversionRate";
import {
    categoryColorMapping,
    categoryIconMapping,
} from "../../../model/Category";
import useRequest from "../../../hooks/useRequest";
import { AppDispatch, RootState } from "../../../store/redux";
import { expensesActions } from "../../../store/expensesSlice";
import { paymentMethodDescriptionMapping } from "../../../model/PaymentMethod";
import NewExpenseDialog from "../NewExpenseDialog";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

const ExpensesList: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [deleteBusy, setDeleteBusy] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [newExpenseDialogOpen, setNewExpenseDialogOpen] = useState(false);
    const [convertToBaseCurrencyActive, setConvertToBaseCurrencyActive] =
        useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const storedExpenses = useSelector(
        (state: RootState) => state.expenses.items
    );
    const baseCurrency = useSelector(
        (state: RootState) => state.expenses.baseCurrency
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

    const handleOpenCreateDialog = () => {
        setNewExpenseDialogOpen(true);
    };

    const handleClose = () => {
        setNewExpenseDialogOpen(false);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleClick = (_e: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelected = storedExpenses.map((expense) =>
                expense.id ? expense.id : ""
            );
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleDelete = () => {
        setDeleteBusy(true);
        const requests = selected.map(
            (expense) =>
                new Promise((resolve, reject) => {
                    removeExpense(expense).then(resolve).catch(reject);
                })
        );

        Promise.all(requests)
            .then(() => {
                dispatch(expensesActions.removeExpenses(selected));
                setSelected([]);
                setDeleteError("");
            })
            .catch((error) => {
                setDeleteError(error.message || "Something went wrong");
            })
            .finally(() => {
                setDeleteBusy(false);
            });
    };

    const handleConvertToBaseCurrency = (convert: boolean) => {
        setConvertToBaseCurrencyActive(convert);
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
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    deleteBusy={deleteBusy}
                    deleteError={deleteError}
                    onCreate={handleOpenCreateDialog}
                    onDelete={handleDelete}
                    onConvertToBaseCurrency={handleConvertToBaseCurrency}
                />
                <TableContainer
                    sx={{
                        outline: "1px solid #ccc",
                        maxHeight: "82vh",
                    }}
                >
                    <Table stickyHeader aria-label="simple table">
                        <EnhancedTableHead
                            onSelectAllClick={handleSelectAllClick}
                            numSelected={selected.length}
                            rowCount={storedExpenses.length}
                        />
                        <TableBody>
                            {storedExpenses &&
                                storedExpenses.map((expense) => {
                                    const isItemSelected =
                                        !!expense.id && isSelected(expense.id);

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(
                                                    event,
                                                    expense.id || ""
                                                )
                                            }
                                            key={expense.id}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
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
                                                        bgcolor:
                                                            categoryColorMapping[
                                                                expense.category
                                                                    .type
                                                            ],
                                                    }}
                                                >
                                                    {
                                                        categoryIconMapping[
                                                            expense.category
                                                                .type
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
                                                {`${
                                                    convertToBaseCurrencyActive
                                                        ? convertToBaseCurrency(
                                                              expense.amount,
                                                              expense.currency
                                                                  .code
                                                          )
                                                        : expense.amount.toFixed(
                                                              2
                                                          )
                                                } ${
                                                    convertToBaseCurrencyActive
                                                        ? currencySymbolMapping[
                                                              baseCurrency
                                                          ]
                                                        : expense.currency
                                                              .symbol
                                                }`}
                                            </TableCell>
                                            <TableCell align="right">
                                                {expense.date}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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
