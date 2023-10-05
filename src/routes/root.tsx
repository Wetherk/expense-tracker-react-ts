import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/Navigation/NavBar";
import { auth } from "../firebase/firebase";
import { AppDispatch } from "../store/redux";
import { authActions } from "../store/authSlice";

const Root: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    auth.onAuthStateChanged((user) => {
        if (user) {
            user.getIdToken().then((accessToken) => {
                if (user.email)
                    dispatch(
                        authActions.setUser({ accessToken, email: user.email })
                    );
                dispatch(authActions.setIsLoggedIn(true));
            });
        } else {
            dispatch(authActions.setUser({ accessToken: "", email: "" }));
            dispatch(authActions.setIsLoggedIn(false));
            navigate("/login?mode=logIn");
        }
    });

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Root;
