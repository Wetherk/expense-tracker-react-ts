import { Outlet } from "react-router-dom";

import NavBar from "../components/Navigation/NavBar";

const Root: React.FC = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Root;
