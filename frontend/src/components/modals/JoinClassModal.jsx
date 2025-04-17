import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../buttons/PurpleButton';
import Star from '../../assets/Star.svg'; // Assuming you have a star image in your assets

const JoinClassModal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

 
  const validationSchema = Yup.object({
    classCode: Yup.string()
      .matches(/^[A-Z0-9]{6}$/, 'Invalid code format (e.g., XXX-XXX-XXX)')
      .required('Class code is required'),
  });

 
  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    alert('Class code submitted: ' + values.classCode);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 ">

      <div style={{ boxShadow: '4px 4px 0px #0b1e2d' }}
       className="bg-white rounded-2xl shadow-lg p-8 sm:w-3/4 lg:w-1/3 relative ">
        
         <img
          src={Star}
          alt="Star"
          className="absolute top-[-20px] left-[-20px] w-16 h-16 sm:w-20 sm:h-20"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 addgrotesk">{title}</h2>
          <p className="text-gray-600 mb-6">
            Stay connected with your class! Enter the code to access assignments and lessons.
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
                    placeholder="XXX-XXX-XXX"
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

export default JoinClassModal;