import React from "react";
import EditProfileForm from "../components/forms/EditProfileForm";
import EditBackground from "../components/EditBackgroud";
import { useAuthGuard } from "../hooks/useAuthGuard";
import MuLoading from "../components/MuLoading";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, isRedirecting, isCheckingAuth } = useAuthGuard();

  useEffect(() => {
    document.title = user?.name || "Profile";
  }, [user]);

  if (isCheckingAuth || isRedirecting) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          {isCheckingAuth ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-xl text-gray-600">
                Checking authentication...
              </p>
            </div>
          ) : (
            <MuLoading
              text={"You are already logged in. Redirecting to profile..."}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-max bg-gray-50 relative overflow-hidden">
      <EditBackground />

      <div className="relative z-10 h-max flex flex-col">
        {/* Main Content - Full height form */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto h-full">
            <div className="bg-slate-200 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col">
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white addgrotesk">
                      {user.name || "User"}
                    </h2>
                    <p className="text-purple-100 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-hidden">
                <EditProfileForm user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
