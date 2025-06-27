import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { base_url } from "./utils/constants";

const Login = () => {
  const [email, setEmail] = useState("Rajen@gmail.com");
  const [password, setPassword] = useState("Rajen@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post( base_url+
        "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const { token } = response.data;
        dispatch(addUser(response.data));

        localStorage.setItem("token", token);
        navigate("/feed");
      }
    } catch (error) {
      setError(error.response?.data);
    }
  };
  const handleSignup = async (e) => {
    try {
      const response = await axios.post(
        base_url + "signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(addUser(response.data.data));
        return navigate("/profile");
      }
    } catch (error) {
      setError(error.response?.data || "An error occurred during signup.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isLoginForm ? "Login" : "Signup"}
        </legend>
        {!isLoginForm && (
          <>
            <label className="label">FirstName</label>
            <input
              type="email"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="FirstName"
            />

            <label className="label">lastname</label>
            <input
              type="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="lastname"
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />
        {error && (
          <div className="bg-error text-error-content p-2 rounded-md text-sm mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            {error}
          </div>
        )}
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "Signup"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              className="text-primary ml-2 hover:underline"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
