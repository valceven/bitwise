import React, { useEffect } from 'react';
import Button from '../components/buttons/PurpleButton';
import EditProfileForm from '../components/forms/EditProfileForm';
import Background from '../components/Background';
import Ellipse from '../assets/Ellipse.svg';
import Polygon from '../assets/Polygon.svg';
import Zigzag from '../assets/zig-zag.svg';
import EditBackground from '../components/EditBackgroud';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, accessToken, refreshAccessToken } = useUser();
  const navigate = useNavigate();

  // Check for the access token and refresh if needed
  useEffect(() => {
    if (!accessToken) {
      refreshAccessToken();
    }
  }, [accessToken, refreshAccessToken]);

  // If no user or access token, redirect to login page
  if (!user || !accessToken) {
    navigate('/login');
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-center">You are not authenticated. Redirecting to login...</p>
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
            Welcome to your profile! Here you can manage your account settings.
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
