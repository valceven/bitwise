import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/logo.svg";
import Background from "../components/Background";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MuLoading from "../components/MuLoading";


function LoginPage() {

  const navigate = useNavigate();
  const { accessToken } = useUser();

  useEffect(() => {
    if (accessToken) {
      const timer = setTimeout(() => {
        navigate("/app/profile");
      }, 2000);
      return () => clearTimeout(timer); // Clean up
    }
  }, [accessToken, navigate]);

  if (accessToken) {
    return <MuLoading text={"You are already logged in. Redirecting to profile..."} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-offwhite">
        <Background />
      <div className="relative z-10 flex flex-col justify-center items-center">
        <img draggable='false' src={logo} alt="Logo" className="h-8 mb-10" />
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
