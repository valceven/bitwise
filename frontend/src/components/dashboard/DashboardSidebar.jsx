import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../assets/icon-logo-sidebar.svg";
import NavLogo from "../../assets/nav-bar-logo-black.svg";

import Bell from "../../assets/bell-icon.svg";
import Sidebar from "../../assets/bx_sidebar.svg";
import ClassroomIconBlack from "../../assets/classroom-icon-black.svg";
import ClassroomIconWhite from "../../assets/classroom-icon.svg";
import StudentReportIconBlack from "../../assets/pie-chart-black.svg";
import StudentReportIconWhite from "../../assets/pie-chart-white.svg";
import PendingStudentIconBlack from "../../assets/student-report-icon-black.svg";
import PendingStudentIconWhite from "../../assets/student-report-icon.svg";
import { useUser } from "../../context/UserContext";

const DashboardSidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [setHovered] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { logoutUser } = useUser();
  const location = useLocation();

  const handleLogout = async (email) => {
    await logoutUser(email);
    window.location.href = "/login";
  };

  const currentPath = location.pathname;

  return (
    <div className="flex z-50">
      {console.log("user type kay : ", user.userType)}
      <Link to="classroom" className="absolute top-6 left-4 z-20">
        <img
          src={user.userType !== 2 ? NavLogo : isOpen ? NavLogo : LogoIcon}
          alt="Logo"
          className={`${
            user.userType === 1 ? "h-8 ml-5" : "h-7"
          } transition-all duration-300`}
        />
      </Link>

      <div
        className={`${
          user.userType === 1 ? "w-0" : isOpen ? "w-42" : "w-16"
        } h-screen transition-all duration-300 flex flex-col pt-16`}
      >
        <nav className="mt-4 flex flex-col space-y-2 px-2">
          {/* Classroom */}
          {user.userType === 2 &&
            (() => {
              const isActive = currentPath.includes("/classroom");
              return (
                <Link
                  to="classroom"
                  onMouseEnter={() => setHovered("classroom")}
                  onMouseLeave={() => setHovered("")}
                  className={`flex items-center py-2 px-3 rounded-md text-xs whitespace-nowrap overflow-hidden text-ellipsis border-black border-0
                  ${
                    isActive
                      ? "bg-bluez text-white border-2"
                      : "hover:bg-gray-200"
                  }
                `}
                >
                  <img
                    src={isActive ? ClassroomIconWhite : ClassroomIconBlack}
                    alt="Classroom"
                    className="h-5 w-5"
                  />
                  {isOpen && <span className="ml-3">Classroom</span>}
                </Link>
              );
            })()}

          {/* Student Pending */}
          {user.userType === 2 &&
            (() => {
              const isActive = currentPath.includes("/teacher/pending");
              return (
                <Link
                  to="teacher/pending"
                  onMouseEnter={() => setHovered("/teacher/pending")}
                  onMouseLeave={() => setHovered("")}
                  className={`flex items-center py-2 px-3 rounded-md text-xs whitespace-nowrap overflow-hidden text-ellipsis border-black border-0
                  ${
                    isActive
                      ? "bg-bluez text-white border-2"
                      : "hover:bg-gray-200"
                  }
                `}
                >
                  <img
                    src={
                      isActive
                        ? PendingStudentIconWhite
                        : PendingStudentIconBlack
                    }
                    alt="Pending Students"
                    className="h-5 w-5"
                  />
                  {isOpen && <span className="ml-3">Pending Students</span>}
                </Link>
              );
            })()}
        </nav>
      </div>

      {/* Toggle Button */}
      {user.userType === 2 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-10 h-10 text-sm mt-4 px-2 py-1 rounded hover:bg-gray-100 z-50"
        >
          <img src={Sidebar} />
        </button>
      )}

      <div className="bg-white w-full absolute flex items-center p-4 px-6 space-x-4">
        <div
          className="relative ml-auto"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className="border text-white bg-bluez hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-xs px-5 py-2.5 text-center inline-flex items-center btn-shadow"
            type="button"
          >
            {user.name}
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
                    to="/app/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => handleLogout(user.email)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full h-full rounded-none p-0 m-0 text-left"
                  >
                    Sign out
                  </button>
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
