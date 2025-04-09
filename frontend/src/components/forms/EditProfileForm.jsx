import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../buttons/PurpleButton";
import { useUser } from "../../context/UserContext";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // For password visibility toggle

const ProfileForm = (profileData) => {
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formChanged, setFormChanged] = useState(false);
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
        name: profileData.user.name || "",
        website: profileData.website || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        email: profileData.user.email || "",
        teacherIdNumber: profileData.user.teacherInfo?.teacherIdNumber || "",
        studentIdNumber: profileData.user.studentInfo?.studentIdNumber || null,
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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    teacherIdNumber: Yup.string().when('userType', {
      is: 'teacher',
      then: schema => schema.required('Teacher ID is required')
    }),
    studentIdNumber: Yup.string().when('userType', {
      is: 'student',
      then: schema => schema.required('Student ID is required')
    }),
  });

  const handleSubmit = async (values) => {
    try {
      await updateUser(profileData.user.userID, values);
      alert("Profile updated successfully!");
      setFormChanged(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
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
    return <div>Loading profile data...</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, dirty }) => {
        // Update formChanged state when form becomes dirty
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          setFormChanged(dirty);
        }, [dirty]);
        
        return (
          <Form className="space-y-12">
            {/* Verification Status */}
            <div className="w-full flex justify-start">
              <div className={`px-3 py-1 rounded-md text-white font-medium ${profileData.user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {profileData.user.isVerified ? 'Verified' : 'Not Verified'}
              </div>
            </div>
            
            {/* Profile Section */}
            <div className="border-b border-gray-900/10 pb-12">
              <div className="w-full flex flex-row items-center space-x-5">
                <img
                  draggable="false"
                  src={values?.photo || "/src/assets/user.svg"}
                  alt="Profile"
                  className="profile-img"
                />
                <label htmlFor="photo">
                  <Button
                    type="button"
                    className="bg-bluez btn-shadow addgrotesk h-3/4 justify-center items-center"
                    onClick={handlePhotoUploadClick}
                  >
                    Upload Photo
                  </Button>
                </label>

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
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                {/* Username */}
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      name="name"
                      id="name"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      placeholder="user@bitwise.com"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                
                {/* User Type Specific Fields */}
                {profileData.user.userType === 2 && (
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="teacherId"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Teacher ID
                    </label>
                    <div className="mt-2">
                      <Field
                        name="teacherId"
                        id="teacherId"
                        type="text"
                        placeholder="Provide your teacher ID to be verified" 
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      <ErrorMessage name="teacherId" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                )}
                
                {profileData.user.userType === 1 && (
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="studentIdNumber"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Student ID
                    </label>
                    <div className="mt-2">
                      <Field
                        name="studentIdNumber"
                        id="studentIdNumber"
                        type="text"
                        placeholder="Provide your student ID to be verified" 
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      <ErrorMessage name="studentIdNumber" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-semibold text-gray-900">
                Update Password
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Keep your account secure by updating your password regularly. Make
                sure to use a strong and unique combination.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Current Password */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Current Password
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      name="password"
                      id="password"
                      type={showPassword.current ? "text" : "password"}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPassword.current ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type={showPassword.new ? "text" : "password"}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPassword.new ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="sm:col-span-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Confirm new password
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      name="confirmPassword"
                      id="confirmPassword"
                      type={showPassword.confirm ? "text" : "password"}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPassword.confirm ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <ErrorMessage 
                      name="confirmPassword" 
                      component="div" 
                      className="text-red-500 text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                type="button"
                className="bg-gray-500 btn-shadow addgrotesk h-3/4 justify-center items-center"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`btn-shadow addgrotesk h-3/4 justify-center items-center ${formChanged ? 'bg-bluez' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!formChanged}
              >
                Save
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;