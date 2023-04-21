// import { getAuth } from "firebase/auth";
import { redirect } from "react-router-dom";

// export async function requireAuth() {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   if (!user) {
//     throw redirect("/sign-in");
//   }

export async function requireAuth() {
  let authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw redirect("/sign-in");
  }
}
