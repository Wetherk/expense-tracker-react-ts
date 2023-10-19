import { useState } from "react";
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

const NewExpense: React.FC = () => {
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

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const dateIsValid = !!date;

    const formIsValid =
        amountIsValid && currencyIsValid && categoryIsValid && dateIsValid;
    const formHasError = amountHasError || categoryHasError || currencyHasError;

    const handleCreateExpense = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            setAmountIsTouched(true);
            setCurrencyIsTouched(true);
            setCategoryIsTouched(true);
            return;
        }
        

        console.log(amount);
        console.log(currency);
        console.log(category);
        console.log(date);
        clearForm();
    };

    const clearForm = () => {
        setAmount("");
        setAmountIsTouched(false);

        setCurrency("");
        setCurrencyIsTouched(false);

        setCategory("");
        setCategoryIsTouched(false);

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
                            value={currency}
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
