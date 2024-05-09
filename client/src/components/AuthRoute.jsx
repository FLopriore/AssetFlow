import SignIn from "./SignIn.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Asset from "./Asset.jsx";
import Expense from "./Expense.jsx";
import App from "../App.jsx";
import Sidebar from "./Sidebar.jsx";
import Income from "./Income.jsx";
import React, {useState} from "react";
import verifyToken from "../utils/verifyToken.utils.js";
import Savings from "./Savings.jsx";


export default function AuthRoute() {
    const [isValidToken, setIsValidToken] = useState(verifyToken());
    // Elenco di route private, accessibili solo se il token non è scaduto
    const privateRouter = createBrowserRouter([
        {
            path: "/",
            element: <App/>
        },

        {
            path: "/login",
            element: <SignIn verify={setIsValidToken}/>
        },

        {
            path: "/expense",
            element: <Expense/>
        },

        {
            path: "/savings",
            element: <Savings/>
        },

        {
            path: "/asset",
            element: <Asset/>
        },

        {
            path: "/income",
            element: <Income/>
        },

        {
            element: <Sidebar/>
        },

        {
            path: "/signup",
            element: <SignUp/>
        }
    ]);

// Elenco di route pubbliche, accessibili anche senza token
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/login"/>
        },
        {
            path: "/login",
            element: <SignIn verify={setIsValidToken}/>
        }
    ])

    return (
        <RouterProvider router={(isValidToken) ? privateRouter : router}/>
    );
}