import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="mt-24 w-full pr-14">
      <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
