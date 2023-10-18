import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from "react-router-dom";

import store from "./store/redux.ts";
import LogIn from "./routes/logIn.tsx";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import Statistics from "./routes/statistics.tsx";
import Categories from "./routes/categories.tsx";
import Expenses from "./routes/expenses.tsx";
import NotFound from "./routes/notFound.tsx";
import UserInfo from "./routes/userInfo.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <LogIn />,
            },
            {
                path: "/",
                element: <Root />,
                loader: () => {
                    const { auth } = store.getState();
                    if (auth.loading) {
                        return null;
                    }
                    if (!auth.isLoggedIn) {
                        return redirect("/login?mode=logIn");
                    }
                    return null;
                },
                children: [
                    { index: true, element: <Home /> },
                    {
                        path: "/expenses",
                        element: <Expenses />,
                    },
                    {
                        path: "/statistics",
                        element: <Statistics />,
                    },
                    {
                        path: "/categories",
                        element: <Categories />,
                    },
                    {
                        path: "/userInfo",
                        element: <UserInfo />,
                    },
                ],
                errorElement: <NotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </LocalizationProvider>
    </React.StrictMode>
);
