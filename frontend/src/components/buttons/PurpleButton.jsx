import React from "react";

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` text-white font-bold py-2 px-4 rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
