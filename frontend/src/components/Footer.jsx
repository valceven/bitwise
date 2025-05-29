import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/std-logo-black.svg";

function Footer() {
  return (
    <footer className="bg-blue-100/80 font-sans bg-grayz addinter">
      <div className="container px-6 py-12 mx-auto">
        <div className="mb-10"></div>

        <hr className="my-2 border-white h-2" />

        <div className="flex justify-center mt-6">
          <p className="text-xs text-white">
            © 2025 Bitwise Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
