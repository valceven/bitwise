import React from 'react';
import Button from '../components/buttons/PurpleButton';
import EditProfileForm from '../components/forms/EditProfileForm';

const ProfilePage = () => {
    return (
        <div className="w-full bg-offwhite py-20"> {/* Moved my-20 here */}
            {/* Content Section */}
            <div className="w-1/2 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] mx-auto">
                <div className="w-full flex flex-col my-5">
                    <h1 className="text-3xl font-bold mb-4 addgrotesk">Account</h1>
                    <p className="text-md addgrotesk">Welcome to your profile! Here you can manage your account settings.</p>
                </div>
                
                <div className='flex items-center w-full'>
                    <EditProfileForm/>
                </div>
        

            

                
                
            </div>
        </div>
    );
};

export default ProfilePage;