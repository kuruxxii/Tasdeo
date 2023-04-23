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

// layouts
import Layout from "./layouts/Layout";
// pages
import Home from "./pages/Home";
import Overview, { loader as overviewLoader } from "./pages/Overview";
import ClassDetail, { loader as classDetailLoader } from "./pages/ClassDetail";
import RemarkRecords, {
  loader as remarkRecordsLoader,
} from "./pages/RemarkRecords";
import RemarkForm, {
  loader as remarkFormLoader,
  action as remarkFormAction,
} from "./pages/RemarkForm";
import SetUp, {
  loader as setUpLoader,
  action as setUpAction,
} from "./pages/SetUp";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="overview" element={<Overview />} loader={overviewLoader} />
        <Route
          path="overview/:classid"
          element={<ClassDetail />}
          loader={classDetailLoader}
        />
        <Route
          path="overview/:classid/:studentid/remarkrecords"
          element={<RemarkRecords />}
          loader={remarkRecordsLoader}
        />
        <Route
          path="overview/:classid/:studentid/remarkform"
          element={<RemarkForm />}
          loader={remarkFormLoader}
          action={remarkFormAction}
        />
        <Route
          path="setup"
          element={<SetUp />}
          loader={setUpLoader}
          action={setUpAction}
        />
        <Route path="about" element={<About />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
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
