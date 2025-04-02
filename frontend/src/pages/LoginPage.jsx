import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import logo from '../assets/logo.png';

function LoginPage() {
  return (
    <div className="flex justify-center items-center mt-48">
      <div className="flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-30 h-6 mb-10" />
        <h1 className="text-3xl font-bold text-black-500 mb-4">Welcome Back!</h1>
        <h3 className="text-md font-bold text-black-500 mb-4">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-bluez hover:underline">
          Sign up now
        </Link>
        </h3>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;