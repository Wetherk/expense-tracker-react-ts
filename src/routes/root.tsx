import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "../components/Navigation/NavBar";

const Root: React.FC = () => {
    return (
        <Box sx={{ height: "100vh" }}>
            <Box sx={{ height: "8%" }}>
                <NavBar />
            </Box>
            <Box sx={{ height: "92%" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Root;
