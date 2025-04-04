import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../fields/InputField";
import Button from "../buttons/PurpleButton";
import { authApi } from "../../api/auth/authApi";

const EditProfileForm = () => {
  const initialValues = {
    username: "",
    website: "",
    email: "",
    bio:'',
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    language: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    website: Yup.string().url("Invalid URL format"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    bio: Yup.string().max(263, "Bio must be at most 263 characters"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .max(25, "Password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .max(25, "New password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "New password must contain a number"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm new password is required"),
    bio: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await authApi.loginUser(values);
      console.log("API Response:", data);
      alert("Login successful!");
    } catch (error) {
      console.error("Error during form submission:", error);

      if (error.response && error.response.data) {
        setErrors({ email: error.response.data.message || "Login failed" });
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {() => (
    <Form className="addinter text-md w-full">
      {/* Username Field */}
      <InputField
        id="username"
        name="username"
        type="text"
        placeholder="Username"
      />

      {/* Website Field */}
      <InputField
        id="website"
        name="website"
        type="url"
        placeholder="Website"
      />

      {/* Email Field */}
      <InputField
        id="email"
        name="email"
        type="email"
        placeholder="Email"
      />

      {/* Bio Field */}
      <InputField
        id="bio"
        name="bio"
        type="text"
        placeholder="Bio"
      />

      {/* Current Password Field */}
      <InputField
        id="password"
        name="password"
        type="password"
        placeholder="Current Password"
      />

      {/* New Password Field */}
      <InputField
        id="newPassword"
        name="newPassword"
        type="password"
        placeholder="New Password"
      />

      {/* Confirm New Password Field */}
      <InputField
        id="confirmNewPassword"
        name="confirmNewPassword"
        type="password"
        placeholder="Confirm New Password"
      />

      {/* Language Field */}
      <InputField
        id="language"
        name="language"
        type="text"
        placeholder="Preferred Language"
      />

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-bluez w-2/3 mt-4 py-2 px-4 btn-shadow addgrotesk"
        >
          Save Changes
        </Button>
      </div>
    </Form>
  )}
</Formik>
  );
};

export default EditProfileForm;
