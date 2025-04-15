import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../buttons/PurpleButton';
import Star from '../../assets/Star.svg';
import { teacherApi } from '../../api/teacher/teacherApi';

const CreateClassModal = ({ isOpen, onClose, title, user }) => {
  if (!isOpen) return null;
  
  const validationSchema = Yup.object({
    className: Yup.string()
      .min(3, 'Class name must be at least 3 characters')
      .required('Class name is required'),
    section: Yup.string()
      .required('Section is required'),
    description: Yup.string()
      .max(200, 'Description cannot exceed 200 characters'),
    teacherID: Yup.string()
      .required('Teacher ID is required')
  });
  
  const handleSubmit = async (values) => {
    try {
        console.log("values ni: ",values);
        const response = await teacherApi.createClassroom(values);
        if (response) alert('Classroom Created Successfully!')
        onClose();
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <img src={Star} alt="Star" className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          Create a new class for your students. Fill in the details below to get started.
        </p>
        
        <Formik
          initialValues={{ className: '', section: '', description: '', teacherID: user.userID }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                  Class Name
                </label>
                <Field
                  id="className"
                  name="className"
                  type="text"
                  placeholder="CS-132"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="className" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <Field
                  id="section"
                  name="section"
                  type="text"
                  placeholder="Enter section (e.g. F1, F2, F3..)"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="section" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  rows="3"
                  placeholder="Enter class description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-bluez btn-shadow text-white w-full px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Class
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateClassModal;