import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../buttons/PurpleButton";
import { useUser } from "../../context/UserContext";

const ProfileForm = (profileData) => {
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  const { updateUser } = useUser(); 


  useEffect(() => {
    const fetchProfile = async () => {
      setInitialValues({
        photo: profileData.photo || null,
        username: profileData.username || "",
        website: profileData.website || "",
        about: profileData.about || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        email: profileData.user.email || "",
      });
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string(),
    about: Yup.string().max(500, "About must be at most 500 characters"),
    website: Yup.string().url("Invalid URL format"),
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
  });

  const handleSubmit = async (values) => {
    try {
      await updateUser(profileData.user.userID, values);
      alert("Profile updated successfully!");
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
      {({ setFieldValue }) => (
        <Form className="space-y-12">
          {/* Profile Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <div className="w-full flex flex-row items-center space-x-5">
              <img
                draggable="false"
                src={initialValues?.photo || "/src/assets/user.svg"}
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
                      console.log("Base64 Image:", reader.result);
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
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <Field
                    name="username"
                    id="username"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
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
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* About */}
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <Field
                    as="textarea"
                    name="about"
                    id="about"
                    rows="3"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage
                    name="about"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
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
                <div className="mt-2">
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
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
                <div className="mt-2">
                  <Field
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
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
                <div className="mt-2">
                  <Field
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button - moved outside the grid layout */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              className="bg-gray-500 btn-shadow addgrotesk h-3/4 justify-center items-center"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-bluez btn-shadow addgrotesk h-3/4 justify-center items-center"
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;