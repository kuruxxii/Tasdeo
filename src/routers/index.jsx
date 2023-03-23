// pages
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Remark from "../pages/Remark";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
// layouts
import BasicLayout from "../layouts/BasicLayout";
// components
import Auth from "../components/Auth";
import { Navigate, useRoutes } from "react-router-dom";

export default function Routers() {
  const element = [
    {
      path: "/",
      element: (
        <Auth>
          <BasicLayout />
        </Auth>
      ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "remark",
          element: <Remark />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
    {
      path: "sign-in",
      element: <SignIn />,
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ];
  return useRoutes(element);
}
