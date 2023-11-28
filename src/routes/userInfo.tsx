import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Avatar,
    Typography,
    Container,
    Card,
    CardContent,
    Box,
    Autocomplete,
    TextField,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

import { logOut } from "../store/authSlice";
import { expensesActions } from "../store/expensesSlice";
import { AppDispatch, RootState } from "../store/redux";
import {
    Currency,
    currencyCodes,
    currencyFullNameMapping,
} from "../model/Currency";

const UserInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const baseCurrency = useSelector(
        (state: RootState) => state.expenses.baseCurrency
    );

    const handleLogout = () => {
        dispatch(logOut());
    };

    const handleCurrencyChange = (
        _e: React.SyntheticEvent,
        value: Currency
    ) => {
        dispatch(expensesActions.setBaseCurrency(value));
    };

    return (
        <Container>
            <Card variant="outlined" sx={{ margin: 4, padding: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        User Info
                    </Typography>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: deepOrange[500],
                                    width: 80,
                                    height: 80,
                                    marginBottom: 2,
                                }}
                            >
                                {user.email?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                Email: {user.email}
                            </Typography>
                            <Button
                                onClick={handleLogout}
                                variant="contained"
                                sx={{ marginTop: 2 }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
            <Autocomplete
                disablePortal
                disableClearable
                sx={{ width: "100%" }}
                options={currencyCodes}
                value={baseCurrency}
                onChange={handleCurrencyChange}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        <Typography
                            sx={{ marginRight: "10px", fontWeight: "bold" }}
                            variant="button"
                        >
                            {option}
                        </Typography>
                        <Typography variant="body1">
                            {option && currencyFullNameMapping[option]}
                        </Typography>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="normal"
                        label="Base Currency"
                    />
                )}
            />
        </Container>
    );
};

export default UserInfo;
