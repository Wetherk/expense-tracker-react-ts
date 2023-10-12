import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { logOut } from "../store/authSlice";
import { AppDispatch } from "../store/redux";

const UserInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logOut());
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
