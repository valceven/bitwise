import React from 'react';
import Button from '../components/buttons/PurpleButton';
import EditProfileForm from '../components/forms/EditProfileForm';
import Background from '../components/Background';
import Ellipse from '../assets/Ellipse.svg';
import Polygon from '../assets/Polygon.svg';
import Zigzag from '../assets/zig-zag.svg';
import EditBackground from '../components/EditBackgroud';
import { useAuthGuard } from '../hooks/useAuthGuard';
import MuLoading from '../components/MuLoading';

const ProfilePage = () => {
  const { user, isRedirecting, isCheckingAuth } = useAuthGuard();
  
    if (isCheckingAuth || isRedirecting) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center">
          <p className="text-xl text-center">
              {isCheckingAuth ? "Checking authentication..." : (
          <MuLoading text={"You are already logged in. Redirecting to profile..."}/>)}
          </p>
        </div>
      );
    }

  return (
    <div className="w-full bg-offwhite py-20">
      <EditBackground />

      <div className="w-1/2 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] mx-auto">
        <div className="w-full flex flex-col my-5">
          <h1 className="text-3xl font-bold mb-4 addgrotesk">Account</h1>
          <p className="text-md addgrotesk">
            Welcome to your {user.userType === 1 ? 'student' : user.userType === 2 ? 'teacher' : 'user'} profile!
          </p>
        </div>

        <div className="flex items-center w-full">
          <EditProfileForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
