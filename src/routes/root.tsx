import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "../components/Navigation/NavBar";

const Root: React.FC = () => {
    return (
        <Box sx={{ height: "100vh" }}>
            <NavBar />
            <Outlet />
        </Box>
    );
};

export default Root;
