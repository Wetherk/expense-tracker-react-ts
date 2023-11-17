import React, { useEffect, useState } from "react";
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
    Tooltip,
    IconButton,
    Checkbox,
    Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { Expense } from "../../model/Expense";
import {
    getExpenses,
    parseExpenses,
    removeExpense,
} from "../../service/Expenses";
import {
    Currency,
    CurrencyRates,
    currencySymbolMapping,
} from "../../model/Currency";
import {
    parseCurrencyRates,
    getCurrencyRates,
} from "../../service/CurrencyConversionRate";
import { categoryIconMapping } from "../../model/Category";
import useRequest from "../../hooks/useRequest";
import { AppDispatch, RootState } from "../../store/redux";
import { expensesActions } from "../../store/expensesSlice";
import { paymentMethodDescriptionMapping } from "../../model/PaymentMethod";
import NewExpenseDialog from "./NewExpenseDialog";

interface EnhancedTableToolbarProps {
    numSelected: number;
    deleteBusy: boolean;
    deleteError: string;
    onCreate: () => void;
    onDelete: () => void;
    onConvertToBaseCurrency: (convert: boolean) => void;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
    const {
        numSelected,
        onCreate,
        onDelete,
        deleteBusy,
        deleteError,
        onConvertToBaseCurrency,
    } = props;
    const [convertToBaseCurrency, setConvertToBaseCurrency] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: rates,
        isLoading: ratesLoading,
        error: ratesError,
        sendRequest: fetchCurrencyRates,
    } = useRequest<CurrencyRates>(getCurrencyRates, parseCurrencyRates);

    useEffect(() => {
        fetchCurrencyRates();
    }, [fetchCurrencyRates]);

    useEffect(() => {
        if (rates) {
            dispatch(expensesActions.setCurrencyRates(rates));
        }
    }, [rates, dispatch]);

    const handleConvertToBaseCurrencyChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConvertToBaseCurrency(event.target.checked);
        onConvertToBaseCurrency(event.target.checked);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                width: "100%",
                outline: "1px solid #ccc",
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h5"
                    component="div"
                >
                    Expenses
                </Typography>
            )}
            {numSelected > 0 && !deleteBusy && !deleteError && (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
            {deleteError && (
                <Alert sx={{ lineHeight: 1 }} severity="error">
                    {deleteError}
                </Alert>
            )}
            {deleteBusy && <CircularProgress size="2rem" />}
            {!(numSelected > 0) && (
                <>
                    <CurrencyRateConversionSwitch
                        onConvertToBaseCurrencyChange={
                            handleConvertToBaseCurrencyChange
                        }
                        convertToBaseCurrency={convertToBaseCurrency}
                        ratesLoading={ratesLoading}
                        ratesError={ratesError}
                    />
                    <Button onClick={onCreate} variant="contained">
                        Create
                    </Button>
                </>
            )}
        </Toolbar>
    );
};

interface CurrencyRateConversionSwitchProps {
    convertToBaseCurrency: boolean;
    onConvertToBaseCurrencyChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    ratesLoading: boolean;
    ratesError: string;
}

const CurrencyRateConversionSwitch: React.FC<
    CurrencyRateConversionSwitchProps
> = (props) => {
    const {
        convertToBaseCurrency,
        onConvertToBaseCurrencyChange,
        ratesError,
        ratesLoading,
    } = props;

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {ratesLoading && <CircularProgress size="2rem" />}
            {!ratesError && !ratesLoading && (
                <Switch
                    checked={convertToBaseCurrency}
                    onChange={onConvertToBaseCurrencyChange}
                    inputProps={{ "aria-label": "controlled" }}
                />
            )}
            {ratesError && !ratesLoading && (
                <Alert
                    sx={{ width: 320, lineHeight: 0.5, marginRight: 1 }}
                    severity="error"
                >
                    {ratesError}
                </Alert>
            )}

            <Typography color="inherit" variant="subtitle1" component="div">
                Convert to base rate
            </Typography>
        </Box>
    );
};

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all expenses",
                        }}
                    />
                </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sum</TableCell>
                <TableCell align="right">Date</TableCell>
            </TableRow>
        </TableHead>
    );
};

const ExpensesList: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [deleteBusy, setDeleteBusy] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [newExpenseDialogOpen, setNewExpenseDialogOpen] = useState(false);
    const [convertToBaseCurrency, setConvertToBaseCurrency] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const storedExpenses = useSelector(
        (state: RootState) => state.expenses.items
    );
    const baseCurrency = useSelector(
        (state: RootState) => state.expenses.baseCurrency
    );
    const currencyRates = useSelector(
        (state: RootState) => state.expenses.currencyRates
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

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
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
        setConvertToBaseCurrency(convert);
    };

    const toBaseCurrency = (amount: number, currency: Currency) => {
        return (amount / currencyRates[currency]!).toFixed(2);
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
                                                    convertToBaseCurrency
                                                        ? toBaseCurrency(
                                                              expense.amount,
                                                              expense.currency
                                                                  .code
                                                          )
                                                        : expense.amount.toFixed(
                                                              2
                                                          )
                                                } ${
                                                    convertToBaseCurrency
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
