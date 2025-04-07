import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/logo.png";
import Background from "../components/Background";

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-offwhite">
        <Background />
      <div className="relative z-10 flex flex-col justify-center items-center">
        <img draggable='false' src={logo} alt="Logo" className="w-30 h-6 mb-10" />
        <h1 className="text-3xl font-bold text-black-500 mb-4">
          Welcome Back!
        </h1>
        <h3 className="text-sm text-black-500 mb-4 addinter mx-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-bluez hover:underline font-bold">
            Sign up now
          </Link>
        </h3>
        <LoginForm />
        <Link to="/forgotpassword" className="underline hover:no-underline text-sm mt-4">
            Forget password?
          </Link>
      </div>
    </div>
  );
}

export default LoginPage;
