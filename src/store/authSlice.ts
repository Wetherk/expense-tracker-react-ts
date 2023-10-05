import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { AppDispatch } from "./redux";
import { getFirebaseErrorMessage } from "../utils/firebaseErrorHandler";
import { User } from "../model/User";

interface AuthState {
    isLoggedIn: boolean;
    error: string;
    user: User;
}

const savedUser = localStorage.getItem("user");
let initialToken = "";
let initialEmail = "";
let initialLoggedIn = false;

if (savedUser) {
    const user = JSON.parse(savedUser);
    initialToken = user.accessToken;
    initialEmail = user.email;
    initialLoggedIn = true;
}

const initialState: AuthState = {
    isLoggedIn: initialLoggedIn,
    error: "",
    user: {
        accessToken: initialToken,
        email: initialEmail,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setUser(
            state,
            action: PayloadAction<{
                accessToken: string;
                email: string;
            }>
        ) {
            state.user.accessToken = action.payload.accessToken;
            state.user.email = action.payload.email;
        },
    },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export default authReducer;

export const createAccount = (
    email: string,
    password: string,
    navigate: NavigateFunction
) => {
    return (dispatch: AppDispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.getIdToken().then((accessToken) => {
                    dispatch(authActions.setUser({ accessToken, email }));
                    dispatch(authActions.setIsLoggedIn(true));
                    dispatch(authActions.setError(""));
                    navigate("/");
                });
            })
            .catch((error) => {
                const errorMessage = getFirebaseErrorMessage(error.code);
                dispatch(authActions.setError(errorMessage));
            });
    };
};

export const logIn = (
    email: string,
    password: string,
    navigate: NavigateFunction
) => {
    return (dispatch: AppDispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.getIdToken().then((accessToken) => {
                    localStorage.setItem(
                        "user",
                        JSON.stringify({ accessToken, email })
                    );
                    dispatch(authActions.setUser({ accessToken, email }));
                    dispatch(authActions.setIsLoggedIn(true));
                    dispatch(authActions.setError(""));
                    navigate("/");
                });
            })
            .catch((error) => {
                const errorMessage = getFirebaseErrorMessage(error.code);
                dispatch(authActions.setError(errorMessage));
            });
    };
};

export const logOut = (navigate: NavigateFunction) => {
    return (dispatch: AppDispatch) => {
        signOut(auth).then(() => {
            // dispatch(authActions.setUser({ accessToken: "", email: "" }));
            // dispatch(authActions.setIsLoggedIn(false));
            localStorage.removeItem("user");
        });
    };
};
