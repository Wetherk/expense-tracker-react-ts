import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store/redux.ts";
import LogIn from "./routes/logIn.tsx";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import Statistics from "./routes/statistics.tsx";
import Categories from "./routes/categories.tsx";
import Expenses from "./routes/expenses.tsx";
import NotFound from "./routes/notFound.tsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/",
        element: <Root />,
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
        ],
        errorElement: <NotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
