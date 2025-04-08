import { useState } from "react";
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

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hovered, setHovered] = useState("");
  const location = useLocation();

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

      <div className="absolute top-4 right-8 flex items-center space-x-4">
        <img src={Bell} />
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        <div className="text-xs font-semibold text-white bg-bluez px-4 py-2 btn-shadow addgrotesk flex flex-row items-center">
          John Doe
          <img src={RightArrow} className="h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
