import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { News , Profile , Interviews } from "./components/Content";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { Setting } from "./components/Setting";
import ListJobs from "./components/Listjobs";
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
        element: <ListJobs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "jobs/:jobId",
        element: <ListJobs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "news",
        element: <News />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "interviews",
        element: <Interviews />,
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