// pages
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Interview from "../pages/Interview";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import ClassDetail from "../pages/ClassDetail";
import HistoryRemarks from "../pages/HistoryRemarks";
import RemarkForm from "../pages/RemarkForm";
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
          path: "interview",
          element: <Interview />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "class-detail",
          element: <ClassDetail />,
        },
        {
          path: "history-remarks",
          element: <HistoryRemarks />,
        },
        {
          path: "remark-form",
          element: <RemarkForm />,
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
