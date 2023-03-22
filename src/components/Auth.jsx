import React from "react";
// import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import useAuthStatus from "../hooks/useAuthStatus";
// import Spinner from "./Spinner";

export default function Auth({ children }) {
  // const { loggedIn, checkingStatus } = useAuthStatus();
  // if (checkingStatus) {
  //   return <Spinner />;
  // }
  const loggedIn = false;
  if (loggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/sign-in" replace />;
  }
}
