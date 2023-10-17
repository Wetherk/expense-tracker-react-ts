import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { auth } from "./firebase/firebase.ts";
import { AppDispatch } from "./store/redux.ts";
import { authActions } from "./store/authSlice.ts";
import { RootState } from "./store/redux.ts";
import LoadingScreen from "./components/UI/LoadingScreen.tsx";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log("Auth state changed");
            console.log(user);
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
                    if (location.pathname === "/login") navigate("/");
                });
            } else {
                dispatch(authActions.setUser({ accessToken: "", email: "" }));
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
