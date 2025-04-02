import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../fields/InputField";
import Button from "../buttons/PurpleButton";
import axios from "axios";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .max(25, "Password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await login(values);
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
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-2/3 mt-4 py-2 px-4 btn-shadow addgrotesk"
            >
              Log in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
