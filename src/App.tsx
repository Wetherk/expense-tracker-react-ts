import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { auth } from "./firebase/firebase.ts";
import { getFirebaseErrorMessage } from "./utils/firebaseErrorHandler.ts";
import { AppDispatch, RootState } from "./store/redux.ts";
import { authActions } from "./store/authSlice.ts";
import LoadingScreen from "./components/UI/LoadingScreen.tsx";
import { expensesActions } from "./store/expensesSlice.ts";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken()
                    .then((accessToken) => {
                        if (user.email) {
                            dispatch(
                                authActions.setUser({
                                    accessToken,
                                    email: user.email,
                                    uid: user.uid,
                                })
                            );
                        }
                        dispatch(authActions.setIsLoggedIn(true));
                        dispatch(authActions.setLoading(false));
                        if (location.pathname === "/login") navigate("/");
                    })
                    .catch((error) => {
                        const errorMessage = getFirebaseErrorMessage(
                            error.code
                        );

                        dispatch(authActions.setError(errorMessage));
                        dispatch(authActions.setLoading(false));
                        if (location.pathname !== "/login")
                            navigate("/login?mode=logIn");
                    });
            } else {
                dispatch(expensesActions.setExpenses([]));
                dispatch(
                    authActions.setUser({ accessToken: "", email: "", uid: "" })
                );
                dispatch(authActions.setIsLoggedIn(false));
                dispatch(authActions.setLoading(false));
                if (location.pathname !== "/login")
                    navigate("/login?mode=logIn");
            }
        });
    }, [dispatch, navigate, location]);

    if (loading) return <LoadingScreen />;

    return <Outlet />;
};

export default App;
