import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { logOut } from "../store/authSlice";
import { AppDispatch } from "../store/redux";

const UserInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut(navigate));
    };
    return (
        <>
            <Button onClick={handleLogout} variant="contained">
                Logout
            </Button>
        </>
    );
};

export default UserInfo;
