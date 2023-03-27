import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import ClassDetail from "../pages/ClassDetail";

// layouts
import BasicLayout from "../layouts/BasicLayout";
// components

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route path="dashboard" element={<BasicLayout />}>
          <Route index element={<Classes />} loader={classesLoader} />
          <Route path="classes/:id" />
          {/* <Route
            path="interview"
            element={<Interview />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route path="about" element={<About />} /> */}
        </Route>

        <Route path="sign-in" element={<SignIn />}></Route>
        <Route path="sign-up" element={<SignUp />}></Route>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
