import React , { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../buttons/PurpleButton";
import axios from "axios";

const ProfileForm = () => {
  const [initialValues, setInitialValues] = useState(null); 
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile"); // please change this - sa backend
        const profileData = response.data;

       
        setInitialValues({
          photo: profileData.photo || null,
          username: profileData.username || "",
          website: profileData.website || "",
          about: profileData.about || "",
          password: "", 
          newPassword: "",
          confirmPassword: "",
          email: profileData.email || "",
          language: profileData.language || "English",
          announcements: profileData.announcements || false,
          support: profileData.support || false,
          offers: profileData.offers || false,
          mobileNotifications: profileData.mobileNotifications || false,
          desktopNotifications: profileData.desktopNotifications || false,
          emailNotifications: profileData.emailNotifications || false,
          frequency: profileData.frequency || "daily",
        });
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    about: Yup.string().max(500, "About must be at most 500 characters"),
    website: Yup.string()
      .url("Invalid URL format"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(25, "Password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
    newPassword: Yup.string()
      .min(6, "New Password must be at least 6 characters")
      .max(25, "New Password must be at most 25 characters")
      .matches(/(?=.*[0-9])/, "New Password must contain a number"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    language: Yup.string(),
  
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    alert("Form submitted successfully!");
  };

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
                                  <img draggable="false" src="/src/assets/user.svg" alt="" className="sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18" />
                                  <Button className="bg-bluez btn-shadow addgrotesk h-3/4 justify-center items-center">
                                      Upload Photo
                                  </Button>
                              </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              
              
              {/* Username */}
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <Field
                    name="username"
                    id="username"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              {/* Email */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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


              {/* Website */}
              <div className="sm:col-span-4">
                <label htmlFor="website" className="block text-sm font-medium text-gray-900">
                  Website
                </label>
                <div className="mt-2">
                  <Field
                    name="website"
                    id="website"
                    type="url"
              
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="website" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* About */}
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium text-gray-900">
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
                  <ErrorMessage name="about" component="div" className="text-red-500 text-sm" />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

            

            
            </div>
          </div>

        
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Password */}
              <div className="sm:col-span-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* New Password */}
              <div className="sm:col-span-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  New Password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    id="newPassword"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="sm:col-span-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Confirm new password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    id="confirmPassword"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Language */}
              <div className="sm:col-span-3">
                <label htmlFor="language" className="block text-sm font-medium text-gray-900">
                  Language
                </label>
                <div className="mt-2">
                  <Field
                    as="select"
                    name="language"
                    id="language"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  >
                    <option value="">Select a country</option>
                    <option value="English">English</option>
                    <option value="Tagalog">Tagalog</option>
                    
                  </Field>
                  <ErrorMessage name="language" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm text-gray-600">
              We'll always let you know about important changes, but you pick what else you want to
              hear about.
            </p>

            <div className="mt-10 space-y-6 addgrotesk">
               {/* Choose notif */}
            <fieldset>
                <legend className="text-sm font-semibold text-gray-900">Choose where you get notified</legend>
                <p className="mt-1 text-sm text-gray-600 addgrotesk">
                Select the platforms where you want to receive notifications.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="checkbox"
                      name="mobileNotifications"
                      id="mobileNotifications"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="mobileNotifications" className="text-sm font-medium text-gray-900">
                    Mobile push notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="checkbox"
                      name="desktopNotifications"
                      id="desktopNotifications"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="desktopNotifications" className="text-sm font-medium text-gray-900">
                      Desktop notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="checkbox"
                      name="emailNotifications"
                      id="emailNotifications"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-900">
                      Email push notifications
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* By Email */}
              <fieldset>
                <legend className="text-sm font-semibold text-gray-900">By email</legend>
                <p className="mt-1 text-sm text-gray-600 addgrotesk">
                Get important updates, news, and activity alerts delivered straight to your inbox.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="checkbox"
                      name="announcements"
                      id="announcements"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="announcements" className="text-sm font-medium text-gray-900">
                    Announcements
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="checkbox"
                      name="support"
                      id="support"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="support" className="text-sm font-medium text-gray-900">
                      Support
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="checkbox"
                      name="offers"
                      id="offers"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="offers" className="text-sm font-medium text-gray-900">
                      Offers
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* Push Notifications */}
              <fieldset>
                <legend className="text-sm font-semibold text-gray-900">Push notifications</legend>
                <p className="mt-1 text-sm text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="radio"
                      name="frequency"
                      value="daily"
                      id="daily-frequency"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="daily-frequency" className="text-sm font-medium text-gray-900">
                      Daily
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="radio"
                      name="frequency"
                      value="weekly"
                      id="weekly-frequency"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="weekly-frequency" className="text-sm font-medium text-gray-900">
                    Weekly
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Field
                      type="radio"
                      name="frequency"
                      value="monthly"
                      id="monthly-frequency"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="monthly-frequency" className="text-sm font-medium text-gray-900">
                      Monthly
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="button" className="bg-gray-500 btn-shadow addgrotesk h-3/4 justify-center items-center"
            onClick={() => navigate(-1)}>
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