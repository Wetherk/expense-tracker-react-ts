import React, { useEffect, useState } from "react";
import {
    CircularProgress,
    Typography,
    Alert,
    Box,
    Button,
    Toolbar,
    Tooltip,
    IconButton,
    Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { CurrencyRates } from "../../../model/Currency";
import {
    parseCurrencyRates,
    getCurrencyRates,
} from "../../../service/CurrencyConversionRate";
import useRequest from "../../../hooks/useRequest";
import { AppDispatch, RootState } from "../../../store/redux";
import { expensesActions } from "../../../store/expensesSlice";

interface CurrencyRateConversionSwitchProps {
    convertToBaseCurrencyActive: boolean;
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
        convertToBaseCurrencyActive,
        onConvertToBaseCurrencyChange,
        ratesError,
        ratesLoading,
    } = props;

    const reduxRates = useSelector(
        (state: RootState) => state.expenses.currencyRates
    );

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {!Object.keys(reduxRates).length && ratesLoading && (
                <CircularProgress sx={{ marginRight: 5 }} size="2rem" />
            )}
            {!!Object.keys(reduxRates).length && (
                <Switch
                    checked={convertToBaseCurrencyActive}
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
    const [convertToBaseCurrencyActive, setConvertToBaseCurrencyActive] =
        useState(false);
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
        setConvertToBaseCurrencyActive(event.target.checked);
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
                        convertToBaseCurrencyActive={
                            convertToBaseCurrencyActive
                        }
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

export default EnhancedTableToolbar;
