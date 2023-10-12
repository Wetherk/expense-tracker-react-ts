import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { auth } from "../firebase/firebase";
import { AppDispatch } from "./redux";
import { getFirebaseErrorMessage } from "../utils/firebaseErrorHandler";
import { User } from "../model/User";

interface AuthState {
    isLoggedIn: boolean;
    error: string;
    user: User;
    loading: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    error: "",
    loading: true,
    user: {
        accessToken: "",
        email: "",
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export default authReducer;

export const createAccount = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        createUserWithEmailAndPassword(auth, email, password).catch((error) => {
            const errorMessage = getFirebaseErrorMessage(error.code);
            dispatch(authActions.setError(errorMessage));
        });
    };
};

export const logIn = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            const errorMessage = getFirebaseErrorMessage(error.code);
            dispatch(authActions.setError(errorMessage));
        });
    };
};

export const logOut = () => {
    return (dispatch: AppDispatch) => {
        signOut(auth).catch((error) => {
            const errorMessage = getFirebaseErrorMessage(error.code);
            dispatch(authActions.setError(errorMessage));
        });
    };
};
