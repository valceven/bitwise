import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import NavLogo from "../assets/nav-bar-logo-black.svg";
import LogoIcon from "../assets/icon-logo-sidebar.svg";

import HomeWhite from "../assets/home-icon.svg";
import HomeBlack from "../assets/home-black.svg";
import ClassroomIconWhite from "../assets/classroom-icon.svg";
import StudentReportIconWhite from "../assets/student-report-icon.svg";
import ClassroomIconBlack from "../assets/classroom-icon-black.svg";
import StudentReportIconBlack from "../assets/student-report-icon-black.svg";
import Sidebar from "../assets/bx_sidebar.svg";
import Bell from "../assets/bell-icon.svg";
import RightArrow from "../assets/chevron-right-white.svg";
import { useUser } from "../context/UserContext";
import Button from "./buttons/PurpleButton";

const DashboardSidebar = (user) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hovered, setHovered] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { logoutUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (email) => {
    console.log("Logging out user:", email);
    logoutUser(email);
    navigate("/login");
  }

  const currentPath = location.pathname;

  return (
    <div className="flex">
      <div className="absolute top-6 left-4 z-20">
        <img
          src={isOpen ? NavLogo : LogoIcon}
          alt="Logo"
          className="h-7" // consistent height
        />
      </div>
      <div
        className={`${
          isOpen ? "w-42" : "w-16"
        } h-screen bg-gray-100 transition-all duration-300 flex flex-col pt-16`}
      >
        <nav className="mt-4 flex flex-col space-y-2 px-2">
          {/* Home */}
          {(() => {
            const isActive = currentPath === "/app" || currentPath === "/app/";
            const isHovered = hovered === "home";
            return (
              <Link
                to="/app"
                onMouseEnter={() => setHovered("home")}
                onMouseLeave={() => setHovered("")}
                className={`flex items-center py-2 px-3 rounded-md text-xs whitespace-nowrap overflow-hidden text-ellipsis border-black border-0
                  ${
                    isHovered || isActive
                      ? "bg-bluez text-white border-2"
                      : "hover:bg-bluez hover:text-white hover:border-2"
                  }
                `}
              >
                <img
                  src={isHovered || isActive ? HomeWhite : HomeBlack}
                  alt="Home"
                  className="h-5 w-5"
                />
                {isOpen && <span className="ml-3">Home</span>}
              </Link>
            );
          })()}

          {/* Classroom */}
          {(() => {
            const isActive = currentPath.includes("/classroom");
            const isHovered = hovered === "classroom";
            return (
              <Link
                to="classroom"
                onMouseEnter={() => setHovered("classroom")}
                onMouseLeave={() => setHovered("")}
                className={`flex items-center py-2 px-3 rounded-md text-xs whitespace-nowrap overflow-hidden text-ellipsis border-black border-0
                  ${
                    isHovered || isActive
                      ? "bg-bluez text-white border-2"
                      : "hover:bg-bluez hover:text-white hover:border-2"
                  }
                `}
              >
                <img
                  src={
                    isHovered || isActive
                      ? ClassroomIconWhite
                      : ClassroomIconBlack
                  }
                  alt="Classroom"
                  className="h-5 w-5"
                />
                {isOpen && <span className="ml-3">Classroom</span>}
              </Link>
            );
          })()}

          {/* Student Report */}
          {(() => {
            const isActive = currentPath.includes("/student-report");
            const isHovered = hovered === "student-report";
            return (
              <Link
                to="student-report"
                onMouseEnter={() => setHovered("student-report")}
                onMouseLeave={() => setHovered("")}
                className={`flex items-center py-2 px-3 rounded-md text-xs whitespace-nowrap overflow-hidden text-ellipsis border-black border-0
                  ${
                    isHovered || isActive
                      ? "bg-bluez text-white border-2"
                      : "hover:bg-bluez hover:text-white hover:border-2"
                  }
                `}
              >
                <img
                  src={
                    isHovered || isActive
                      ? StudentReportIconWhite
                      : StudentReportIconBlack
                  }
                  alt="Student Report"
                  className="h-5 w-5"
                />
                {isOpen && <span className="ml-3">Student Report</span>}
              </Link>
            );
          })()}
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 text-sm m-2 px-2 py-1 rounded hover:bg-gray-100"
      >
        <img src={Sidebar} />
      </button>

      <div className="absolute top-4 right-14 flex items-center space-x-4">
        <img src={Bell} />
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>

        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className="border text-white bg-bluez hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-xs px-5 py-2.5 text-center inline-flex items-center btn-shadow"
            type="button"
          >
            {user.user.name}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() => handleLogout(user.user.email)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign out
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
