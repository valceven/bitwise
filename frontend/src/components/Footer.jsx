import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/std-logo-black.svg";

function Footer() {
  return (
    <footer class="bg-blue-100/80 font-sans bg-grayz addinter">
      <div class="container px-6 py-12 mx-auto">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div class="sm:col-span-2">
            <Link to="/">
              <img src={FooterLogo} alt="My Icon" className="h-7 mb-6" />
            </Link>
            <p class="max-w-lg text-sm tracking-tight text-white xl:text-sm">
              Join our newsletter to stay up to date on features and releases.
            </p>

            <div class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                class="text-white px-4 py-2 border  focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Enter your email"
              />

              <button class="w-full px-6 py-2.5 text-sm tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none border-1 border-white hover:bg-white hover:text-black focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                Subscribe
              </button>
            </div>
            <p class="mt-5 mb-2 max-w-lg text-sm tracking-tight text-white xl:text-xs">
              By subscribing you agree to with our Privacy Policy and provide
              consent to receive updates from our company.
            </p>
          </div>

          <div>
            <p class="font-semibold text-white">Quick Link</p>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <p class="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                Home
              </p>
              <p class="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                Who We Are
              </p>
              <p class="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                Our Philosophy
              </p>
            </div>
          </div>

          <div>
            <p class="font-semibold text-white">Industries</p>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <p class="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                Retail & E-Commerce
              </p>
              <p class="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                Information Technology
              </p>
              <p class="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                Finance & Insurance
              </p>
            </div>
          </div>
        </div>

        <hr class="my-2 mt-10 border-white md:mt-10 h-2" />
        <div className="flex flex-col items-center justify-between mt-6 space-y-4 md:space-y-0 md:flex-row">
          <p class="text-xs text-start text-white md:text-left">
            © 2025 Bitwise Inc. All rights reserved.
          </p>
          <div className="flex flex-col items-center space-y-2 md:space-x-4 md:space-y-0 md:flex-row">
            <p class="underline text-xs text-start text-white md:text-left">
              Privacy Policy
            </p>
            <p class="underline text-xs text-start text-white md:text-left">
              Terms of Service
            </p>
            <p class="underline text-xs text-start text-white md:text-left">
              Cookies Settings
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
