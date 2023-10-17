import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Routes = "/" | "/categories" | "/statistics" | "/expenses" | "/userInfo";

const isRoute = (path: string): path is Routes => {
    return [
        "/",
        "/categories",
        "/statistics",
        "/expenses",
        "/userInfo",
    ].includes(path);
};

const NavBar: React.FC = () => {
    const location = useLocation();

    let currentLocationPath: Routes = "/";

    if (isRoute(location.pathname)) {
        currentLocationPath = location.pathname;
    }

    const [currentRoute, setCurrentRoute] =
        useState<Routes>(currentLocationPath);
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
            <BottomNavigationAction
                value="/userInfo"
                label="User"
                icon={<PersonIcon />}
            />
        </BottomNavigation>
    );
};

export default NavBar;
