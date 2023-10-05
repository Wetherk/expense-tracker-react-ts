import { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { createAccount, logIn } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/redux";

const LogIn: React.FC = () => {
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    const modeParam = queryParams.get("mode");
    const authMode = modeParam === "logIn" ? "logIn" : "signUp";

    const dispatch = useDispatch<AppDispatch>();
    const authError = useSelector((state: RootState) => state.auth.error);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const emailHasError = !isEmailValid && isEmailTouched;

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const passwordHasError = !isPasswordValid && isPasswordTouched;

    const formHasError = emailHasError || passwordHasError;
    const isFormValid = isPasswordValid && isEmailValid;

    const handleEmailChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const email = event.target.value;

        setEmail(email);

        if (email.includes("@") && email.length > 3) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };

    const handleEmailBlur = () => {
        setIsEmailTouched(true);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const password = event.target.value;

        setPassword(password);

        if (password.length >= 6) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    };

    const handlePasswordBlur = () => {
        setIsPasswordTouched(true);
    };

    const handleLogin = () => {
        if (!isFormValid) {
            setIsPasswordTouched(true);
            setIsEmailTouched(true);
            return;
        }

        if (authMode === "logIn") dispatch(logIn(email, password, navigate));
        if (authMode === "signUp")
            dispatch(createAccount(email, password, navigate));
    };

    const authTitle = authMode === "logIn" ? "Log In" : "Sign Up";
    const authButtonText = authMode === "logIn" ? "LOG IN" : "SIGN UP";
    const helperLinkText =
        authMode === "logIn"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In";
    const helperLinkHref =
        authMode === "logIn" ? "/login?mode=signUp" : "/login?mode=logIn";

    const handleModeChangeClick = () => {
        navigate(helperLinkHref);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Container maxWidth="xs">
                <Typography
                    variant="h5"
                    style={{ margin: "2rem 0 1rem", textAlign: "center" }}
                >
                    {authTitle}
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    helperText={emailHasError && "Enter correct email address"}
                    error={emailHasError}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    helperText={
                        passwordHasError &&
                        "Password should be at least 6 characters"
                    }
                    error={passwordHasError}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "1rem" }}
                    onClick={handleLogin}
                    disabled={formHasError}
                >
                    {authButtonText}
                </Button>
            </Container>

            <Link
                component="button"
                variant="body2"
                style={{ marginTop: "1rem" }}
                onClick={handleModeChangeClick}
            >
                {helperLinkText}
            </Link>
            {authError && (
                <Alert severity="error" style={{ marginTop: "1rem" }}>
                    {authError}
                </Alert>
            )}
        </Box>
    );
};

export default LogIn;
