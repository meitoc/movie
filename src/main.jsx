import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { News , Profile , Interviews , Logout } from "./child/Content";
import { Setting } from "./child/Setting";
import ListJobs from "./child/Listjobs";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ListJobs />,
      },
      {
        path: "jobs/:jobId",
        element: <ListJobs />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "interviews",
        element: <Interviews />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);