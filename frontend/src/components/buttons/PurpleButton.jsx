import React from "react";
import { useField } from 'formik';

const Button = ({children, type = "button", onClick, className = ""}) =>{
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-purple-500 text-white font-bold py-2 px-4 rounded-full ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;