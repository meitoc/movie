import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
// import HotDeals from "./pages/Hotdeals";
import App from "./App";

import Account from "./pages/Account";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { Setting } from "./pages/Setting";
import ErrorPage from "./pages/ErrorPage";
import Movies from "./pages/Movies";
import Search from "./pages/Search";

import NowPlaying from "./pages/movielists/NowPlaying";
import UpComing from "./pages/movielists/UpComing";
import Popular from "./pages/movielists/Popular";
import TopRated from "./pages/movielists/TopRated";

import Genres from "./pages/Genres";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Movies />,
        errorElement: <ErrorPage />,
      },
      {
        path: "movies/:movieId",
        element: <Movies />,
        errorElement: <ErrorPage />,
      },
      {
        path: "movielists",
        errorElement: <ErrorPage />,
        children:[
          {
            path: "nowplaying",
            element: <NowPlaying />,
            errorElement: <ErrorPage />,
          },
          {
            path: "top_rated",
            element: <TopRated />,
            errorElement: <ErrorPage />,
          },
          {
            path: "upcoming",
            element: <UpComing />,
            errorElement: <ErrorPage />,
          },
          {
            path: "popular",
            element: <Popular />,
            errorElement: <ErrorPage />,
          },
        ]
      },
      {
        path: "genres",
        element: <Genres />,
        errorElement: <ErrorPage />,
      },
      {
        path: "genres/:genresId",
        element: <Genres />,
        errorElement: <ErrorPage />,
      },
      {
        path: "search",
        element: <Search />,
        errorElement: <ErrorPage />,
      },
      {
        path: "account",
        element: <Account />,
        errorElement: <ErrorPage />,
      },
      {
        path: "favorite",
        element: <Favorite />,
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