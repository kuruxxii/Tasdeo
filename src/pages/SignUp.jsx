import { useState } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import homebg from "../images/homebg.jpg";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "../config/firebase";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      //写进Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });

      // 写进Firestore Database的professors collection
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "professors", user.uid), formDataCopy);
      const idToken = await user.getIdToken();
      localStorage.setItem("authToken", idToken);
      localStorage.setItem("uid", user.uid);
      toast.success("Success!");
      navigate("/overview");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <section
      className="h-screen bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="lg:w-1/3 px-4 py-6">
        <h1 className="mb-4 text-white text-3xl text-center mt-6 font-bold">
          Sign Up
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            value={formData.name}
            name="name"
            onChange={onChange}
            placeholder="Full name"
          />
          <input
            type="email"
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            value={formData.email}
            name="email"
            onChange={onChange}
            placeholder="Email address"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              value={formData.password}
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <AiFillEye
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p className="mb-6 text-white">
              Already have an account?
              <Link
                to="/sign-in"
                className="ml-2 hover:text-red-700 transition duration-200 ease-in-out ml-1">
                Sign in
              </Link>
            </p>
            <p>
              <Link
                to="/forgot-password"
                className="text-white hover:text-[#8389a6] transition duration-200 ease-in-out ml-1">
                Forgot password?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="mb-4 w-full px-7 py-3 text-sm font-medium uppercase rounded shadow-lg bg-[#d7bb5b] hover:bg-green-500 active:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
