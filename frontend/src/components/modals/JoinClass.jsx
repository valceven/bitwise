import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../buttons/PurpleButton';
import Star from '../../assets/Star.svg'; // Adjust if needed
import { studentApi } from '../../api/student/studentApi';

const JoinClass = ({ title = "Join a Class", user}) => {
  const validationSchema = Yup.object({
    classCode: Yup.string()
      .matches(/^[A-Z0-9]{6}$/, 'Invalid code format (e.g., ABC123)')
      .required('Class code is required'),
  });

  const handleSubmit = async (values) => {
    try {
      values.userType = user.userType;
      values.studentId = user.userID;
      const response = await studentApi.joinClassroom(values);
      alert(response.message);
    } catch (error) {
      console.error('Error creating class: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <div
        style={{ boxShadow: '4px 4px 0px #0b1e2d' }}
        className="relative bg-white rounded-2xl p-8 w-full max-w-md border-1"
      >
        <img
          src={Star}
          alt="Star"
          className="absolute top-[-20px] left-[-20px] w-16 h-16 sm:w-20 sm:h-20"
        />

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 addgrotesk">{title}</h2>
          <p className="text-gray-600 mb-6">
          You haven't joined a classroom yet. Stay connected with your class by entering the class code to access assignments and lessons.
          </p>

          <Formik
            initialValues={{ classCode: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <Field
                    name="classCode"
                    type="text"
                    placeholder="ABC123"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage
                    name="classCode"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-bluez btn-shadow text-white w-full px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Join
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
