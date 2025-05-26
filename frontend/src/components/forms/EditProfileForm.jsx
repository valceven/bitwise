import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../buttons/PurpleButton";
import { useUser } from "../../context/UserContext";
import { EyeIcon, EyeOffIcon, User, Mail, Lock, Shield, Camera, CheckCircle, XCircle } from "lucide-react";
import { toast } from 'react-toastify';

const EditProfileForm = ({ user: profileData }) => {
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formChanged, setFormChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const { updateUser } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      setInitialValues({
        photo: profileData.photo || null,
        name: profileData.name || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        email: profileData.email || "",
        teacherIdNumber: profileData.teacherInfo?.teacherIdNumber || null,
        studentIdNumber: profileData.studentInfo?.studentIdNumber || null,
      });
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(25, "Password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
    newPassword: Yup.string()
      .min(6, "New Password must be at least 6 characters")
      .max(25, "New Password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "New Password must contain a number"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
    email: Yup.string().email("Invalid email address").required("Email is required")
  });

  const handleSubmit = async (values) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        photo: values.photo,
        name: values.name,
        password: values.password,
        newPassword: values.newPassword,
        email: values.email,
        teacherIdNumber: values.teacherIdNumber,
        studentIdNumber: values.studentIdNumber
      };
      
      console.log(dataToSubmit);
      await updateUser(profileData.userID, dataToSubmit);
      
      // Success toast
      toast.success("🎉 Profile updated successfully!", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: false,
      });
      
      setFormChanged(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      
      // Error toast
      toast.error("❌ Failed to update profile. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUploadClick = () => {
    const photoInput = document.getElementById("photo");
    if (photoInput) {
      photoInput.click();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading profile data...</span>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, dirty }) => {
        useEffect(() => {
          setFormChanged(dirty);
        }, [dirty]);
        
        return (
          <Form className="h-full max-h-[80vh] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              
              {/* Left Column - Profile & Basic Info */}
              <div className="space-y-6">
                {/* Verification Status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Account Status
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profileData.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profileData.isVerified ? 'Verified' : 'Not Verified'}
                  </div>
                </div>
                
                {/* Profile Photo Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Profile Photo
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        draggable="false"
                        src={values?.photo || "/src/assets/user.svg"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        onClick={handlePhotoUploadClick}
                      >
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFieldValue("photo", reader.result);
                            // Photo upload success toast
                            toast.info("📸 Photo uploaded! Don't forget to save your changes.", {
                              position: "bottom-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              icon: false,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Basic Information
                  </h4>
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Field
                      name="name"
                      id="name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Field
                        name="email"
                        id="email"
                        type="email"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="your.email@example.com"
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  
                  {/* ID Number Fields */}
                  {profileData.userType === 2 && (
                    <div>
                      <label htmlFor="teacherIdNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Teacher ID Number
                      </label>
                      <Field
                        name="teacherIdNumber"
                        id="teacherIdNumber"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="Enter your teacher ID for verification"
                      />
                      <ErrorMessage name="teacherIdNumber" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  )}
                  
                  {profileData.userType === 1 && (
                    <div>
                      <label htmlFor="studentIdNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID Number
                      </label>
                      <Field
                        name="studentIdNumber"
                        id="studentIdNumber"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="Enter your student ID for verification"
                      />
                      <ErrorMessage name="studentIdNumber" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Security Settings */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 h-full">
                  <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Security Settings
                  </h4>
                  <p className="text-sm text-gray-600 mb-6">
                    Update your password to keep your account secure. Leave blank to keep current password.
                  </p>

                  <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <Field
                          name="password"
                          id="password"
                          type={showPassword.current ? "text" : "password"}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility('current')}
                        >
                          {showPassword.current ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* New Password */}
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <Field
                          name="newPassword"
                          id="newPassword"
                          type={showPassword.new ? "text" : "password"}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showPassword.new ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Field
                          name="confirmPassword"
                          id="confirmPassword"
                          type={showPassword.confirm ? "text" : "password"}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showPassword.confirm ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-50 rounded-lg p-3 mt-4">
                      <h5 className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</h5>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• At least 6 characters long</li>
                        <li>• Maximum 25 characters</li>
                        <li>• Must contain at least one number</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
              <Button
                type="button"
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                onClick={() => {
                  if (formChanged) {
                    toast.warning("⚠️ You have unsaved changes. Are you sure you want to leave?", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      icon: false,
                    });
                    // Give user a moment to see the warning before navigating
                    setTimeout(() => {
                      window.history.back();
                    }, 2000);
                  } else {
                    window.history.back();
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  formChanged && !isSubmitting
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!formChanged || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProfileForm;