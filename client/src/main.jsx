import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './components/SignIn.jsx';
import Expense from './components/Expense.jsx';
import Savings from './components/Savings.jsx';
import Asset from './components/Asset.jsx';
import Income from './components/Income.jsx';
import Sidebar from './components/Sidebar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  
  {
    path: "/login",
    element: <SignIn />
  },

  {
    path: "/expense",
    element: <Expense />
  },

  {
    path: "/savings",
    element: <Savings />
  },

  {
    path: "/asset",
    element: <Asset />
  },

  {
    path: "/income",
    element: <Income />
  },

  {
    element: <Sidebar />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)