import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Autocomplete,
    TextField,
    Box,
    Typography,
    Avatar,
    InputAdornment,
    Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

import {
    currencyCodes,
    currencyFullNameMapping,
    Currency,
    currencySymbolMapping,
} from "../../model/Currency";
import {
    categoryOptions,
    categoryIconMapping,
    expenseCategoryDescriptionMapping,
    Category,
} from "../../model/Category";
import {
    PaymentMethod,
    paymentMethods,
    paymentMethodDescriptionMapping,
} from "../../model/PaymentMethod";
import { createExpense } from "../../model/Expense";
import { addExpense } from "../../service/Expenses";
import { AppDispatch } from "../../store/redux";
import { expensesActions } from "../../store/expensesSlice";

const NewExpense: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [amount, setAmount] = useState<string>("");
    const [amountIsTouched, setAmountIsTouched] = useState<boolean>(false);
    const amountIsValid = amountIsTouched && !!amount && !isNaN(+amount);
    const amountHasError = amountIsTouched && !amountIsValid;

    const [currency, setCurrency] = useState<Currency | "">("");
    const [currencyIsTouched, setCurrencyIsTouched] = useState<boolean>(false);
    const currencyIsValid = currencyIsTouched && !!currency;
    const currencyHasError = currencyIsTouched && !currencyIsValid;

    const [category, setCategory] = useState<Category | "">("");
    const [categoryIsTouched, setCategoryIsTouched] = useState<boolean>(false);
    const categoryIsValid = categoryIsTouched && !!category;
    const categoryHasError = categoryIsTouched && !categoryIsValid;

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
    const [paymentMethodIsTouched, setPaymentMethodIsTouched] =
        useState<boolean>(false);
    const paymentMethodIsValid = paymentMethodIsTouched && !!paymentMethod;
    const paymentMethodHasError =
        paymentMethodIsTouched && !paymentMethodIsValid;

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const dateIsValid = !!date;

    const formIsValid =
        amountIsValid &&
        currencyIsValid &&
        categoryIsValid &&
        paymentMethodIsValid &&
        dateIsValid;
    const formHasError =
        amountHasError ||
        categoryHasError ||
        paymentMethodHasError ||
        currencyHasError;

    const handleCreateExpense = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            setAmountIsTouched(true);
            setCurrencyIsTouched(true);
            setCategoryIsTouched(true);
            setPaymentMethodIsTouched(true);
            return;
        }

        const createdExpense = createExpense(
            +amount,
            category,
            date.toDate(),
            paymentMethod,
            currency
        );

        addExpense(createdExpense).then((expenses) => {
            dispatch(expensesActions.setExpenses(expenses));
        });

        clearForm();
    };

    const clearForm = () => {
        setAmount("");
        setAmountIsTouched(false);

        setCurrency("");
        setCurrencyIsTouched(false);

        setCategory("");
        setCategoryIsTouched(false);

        setPaymentMethod("");
        setPaymentMethodIsTouched(false);

        setDate(dayjs());
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleAmountBlur = () => {
        setAmountIsTouched(true);
    };

    const handleCurrencyChange = (
        e: React.SyntheticEvent,
        value: Currency | null
    ) => {
        if (value) {
            setCurrency(value);
        } else {
            setCurrency("");
            setAmount("");
        }
    };

    const handleCurrencyBlur = () => {
        setCurrencyIsTouched(true);
    };

    const handleCategoryChange = (
        e: React.SyntheticEvent,
        value: Category | null
    ) => {
        if (value) {
            setCategory(value);
        } else {
            setCategory("");
        }
    };

    const handleCategoryBlur = () => {
        setCategoryIsTouched(true);
    };

    const handlePaymentMethodChange = (
        e: React.SyntheticEvent,
        value: PaymentMethod | null
    ) => {
        if (value) {
            setPaymentMethod(value);
        } else {
            setPaymentMethod("");
        }
    };

    const handlePaymentMethodBlur = () => {
        setPaymentMethodIsTouched(true);
    };

    const handleDateChange = (value: Dayjs | null) => {
        setDate(value);
    };

    return (
        <Box sx={{ width: "40vw" }}>
            <form onSubmit={handleCreateExpense}>
                <TextField
                    sx={{ width: "100%" }}
                    label="Amount"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    value={amount}
                    disabled={!currency}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    error={amountHasError}
                    helperText={
                        amountHasError && "Field should be a valid number."
                    }
                    inputProps={{
                        autoComplete: "new-password",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {currency && currencySymbolMapping[currency]}
                            </InputAdornment>
                        ),
                    }}
                />

                <Autocomplete
                    disablePortal
                    sx={{ width: "100%" }}
                    options={currencyCodes}
                    onChange={handleCurrencyChange}
                    onBlur={handleCurrencyBlur}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Typography
                                sx={{ marginRight: "10px", fontWeight: "bold" }}
                                variant="button"
                            >
                                {option}
                            </Typography>
                            <Typography variant="body1">
                                {currencyFullNameMapping[option]}
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={currencyHasError}
                            helperText={
                                currencyHasError && "Field should not be empty."
                            }
                            margin="normal"
                            label="Currency"
                        />
                    )}
                />

                <Autocomplete
                    disablePortal
                    sx={{ width: "100%" }}
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    onBlur={handleCategoryBlur}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Avatar
                                sx={{
                                    marginRight: "10px",
                                }}
                            >
                                {categoryIconMapping[option]}
                            </Avatar>
                            <Typography variant="body1">
                                {expenseCategoryDescriptionMapping[option]}
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => {
                        const value = params.inputProps.value as Category;

                        params.inputProps.value =
                            expenseCategoryDescriptionMapping[value] || "";

                        return (
                            <TextField
                                {...params}
                                margin="normal"
                                label="Category"
                                error={categoryHasError}
                                helperText={
                                    categoryHasError &&
                                    "Field should not be empty."
                                }
                            />
                        );
                    }}
                />

                <Autocomplete
                    disablePortal
                    sx={{ width: "100%" }}
                    options={paymentMethods}
                    onChange={handlePaymentMethodChange}
                    onBlur={handlePaymentMethodBlur}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Typography variant="body1">
                                {paymentMethodDescriptionMapping[option]}
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => {
                        const value = params.inputProps.value as PaymentMethod;

                        params.inputProps.value =
                            paymentMethodDescriptionMapping[value] || "";

                        return (
                            <TextField
                                {...params}
                                error={paymentMethodHasError}
                                helperText={
                                    paymentMethodHasError &&
                                    "Field should not be empty."
                                }
                                value={paymentMethod}
                                margin="normal"
                                label="Payment Method"
                            />
                        );
                    }}
                />

                <DateTimePicker
                    sx={{ width: "100%", marginTop: "1rem" }}
                    onChange={handleDateChange}
                    value={date}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        disabled={formHasError}
                        color="primary"
                        fullWidth
                        sx={{
                            marginTop: "1rem",
                            width: "30%",
                        }}
                        type="submit"
                    >
                        Create
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default NewExpense;
