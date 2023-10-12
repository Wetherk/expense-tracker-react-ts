import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { auth } from "./firebase/firebase.ts";
import { AppDispatch } from "./store/redux.ts";
import { authActions } from "./store/authSlice.ts";
import { RootState } from "./store/redux.ts";
import LoadingScreen from "./components/UI/LoadingScreen.tsx";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((accessToken) => {
                    if (user.email)
                        dispatch(
                            authActions.setUser({
                                accessToken,
                                email: user.email,
                            })
                        );
                    dispatch(authActions.setIsLoggedIn(true));
                    dispatch(authActions.setLoading(false));
                    navigate("/");
                });
            } else {
                dispatch(authActions.setUser({ accessToken: "", email: "" }));
                dispatch(authActions.setIsLoggedIn(false));
                dispatch(authActions.setLoading(false));
                navigate("/login?mode=logIn");
            }
        });
    }, [dispatch, navigate]);

    if (loading) return <LoadingScreen />;

    return <Outlet />;
};

export default App;
