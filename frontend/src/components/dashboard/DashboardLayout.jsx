import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import MuLoading from "../MuLoading";

const DashboardLayout = () => {
  const { user, isRedirecting, isCheckingAuth } = useAuthGuard();

  if (isCheckingAuth || isRedirecting) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-center">
          {isCheckingAuth ? "Checking authentication..." : (
        <MuLoading text={"You are not authenticated. Redirecting to login..."}/>
      )}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <DashboardSidebar user={user}/>
      <div className="w-full mt-24 flex justify-center">
      <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
