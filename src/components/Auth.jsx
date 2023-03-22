import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function Auth({ children }) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/sign-in" replace />;
  }
}
