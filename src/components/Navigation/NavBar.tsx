import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Routes = "/" | "/categories" | "/statistics";

const NavBar: React.FC = () => {
    const [currentRoute, setCurrentRoute] = useState<Routes>("/");
    const navigate = useNavigate();

    const handleNavigationChange = (
        event: React.SyntheticEvent,
        value: Routes
    ) => {
        setCurrentRoute(value);
        navigate(value);
    };

    return (
        <BottomNavigation
            showLabels
            value={currentRoute}
            onChange={handleNavigationChange}
        >
            <BottomNavigationAction
                value="/"
                label="Home"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                value="/expenses"
                label="Expenses"
                icon={<AttachMoneyIcon />}
            />
            <BottomNavigationAction
                value="/statistics"
                label="Statistics"
                icon={<QueryStatsIcon />}
            />
            <BottomNavigationAction
                value="/categories"
                label="Categories"
                icon={<CategoryIcon />}
            />
        </BottomNavigation>
    );
};

export default NavBar;
