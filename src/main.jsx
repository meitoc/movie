import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
// import HotDeals from "./pages/Hotdeals";
import Account from "./pages/Account";
import { Cart } from "./pages/Cart";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { Setting } from "./pages/Setting";
import Products from "./pages/Products";
import App from "./App";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Products />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products/:productId",
        element: <Products />,
        errorElement: <ErrorPage />,
      },
      // {
      //   path: "hotdeals",
      //   element: <HotDeals />,
      //   errorElement: <ErrorPage />,
      // },
      {
        path: "account",
        element: <Account />,
        errorElement: <ErrorPage />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      {
        path: "setting",
        element: <Setting />,
        errorElement: <ErrorPage />,
      },
      {
        path: "logout",
        element: <Logout />,
        errorElement: <ErrorPage />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);