import { useState } from "react";
import React from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import homebg from "../images/homebg.jpg";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  function onChange(e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, formData.email);
      toast.success("Email sent!");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <section
      className="h-screen bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="lg:w-1/3 px-4 py-6">
        <h1 className="text-3xl text-center mt-6 mb-4 font-bold text-white">
          Reset Password
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            value={formData.email}
            name="email"
            onChange={onChange}
            placeholder="Email address"
          />
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p className="mb-6 text-white">
              Don't have an account?
              <Link
                to="/sign-up"
                className="ml-2 text-white hover:text-red-700 transition duration-200 ease-in-out ml-1">
                Register
              </Link>
            </p>
            <p>
              <Link
                to="/sign-in"
                className="text-white hover:text-[#8389a6] transition duration-200 ease-in-out ml-1">
                Sign in
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="mb-4 w-full px-7 py-3 text-sm font-medium uppercase rounded shadow-lg bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Send reset password
          </button>
        </form>
      </div>
    </section>
  );
}
