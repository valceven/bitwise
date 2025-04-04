import React from 'react';
import Button from '../components/buttons/PurpleButton';
import EditProfileForm from '../components/forms/EditProfileForm';
const ProfilePage = () => {
    return (
        <div className='w-full flex justify-center items-center bg-offwhite'>
            <div className="w-1/2 flex flex-col items-center justify-center min-h-screen">
                <div className="w-full flex flex-col mb-5">
                    <h1 className="text-3xl font-bold mb-4 addgrotesk">Account</h1>
                    <p className="text-md addgrotesk">Welcome to your profile! Here you can manage your account settings.</p>
                </div>
                <div className="w-full flex flex-row items-center space-x-5">
                    <img draggable='false' src="/src/assets/user.svg" alt="" className="sm:w-12 h-12 md:w-16 h-16 lg:w-18 h-18" />
                    <Button className='bg-bluez btn-shadow addgrotesk h-3/4 justify-center items-center'>
                        Upload Photo
                    </Button>
                </div>
                <EditProfileForm />
            
            </div>
        </div>
        
    );

}

export default ProfilePage;