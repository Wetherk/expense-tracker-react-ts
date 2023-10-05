import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { auth } from "../firebase/firebase";
import { AppDispatch } from "./redux";
import { getFirebaseErrorMessage } from "../utils/firebaseErrorHandler";

interface AuthState {
    isLoggedIn: boolean;
    error: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    error: "",
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
    },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export default authReducer;

export const createAccount = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);
                dispatch(authActions.setError(""));
            })
            .catch((error) => {
                const errorMessage = getFirebaseErrorMessage(error.code);
                dispatch(authActions.setError(errorMessage));
            });
    };
};

export const logIn = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);
                dispatch(authActions.setError(""));
            })
            .catch((error) => {
                debugger;
                const errorMessage = getFirebaseErrorMessage(error.code);
                dispatch(authActions.setError(errorMessage));
            });
    };
};
