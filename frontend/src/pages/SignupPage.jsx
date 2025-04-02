import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/fields/InputField';
import Button from '../components/buttons/PurpleButton';
import DropdownField from '../components/fields/DropDownField';

const SignupPage = () => {
    const [step, setStep] = useState(1); // Track the current step

    // Initial values for all steps
    const initialValues = {
        name: '',
        email: '',
        username: '',
        password: '',
        userType: '',
    };

    // Validation schemas for each step
    const validationSchemas = [
        Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
                .max(25, 'Password must be at most 25 characters')
                .matches(/(?=.*[0-9])/, 'Password must contain a number'),
        }),
        Yup.object({
            userType: Yup.string().required('user type is required'),
        }),
    ];

    // Handle form submission
    const handleSubmit = (values) => {
        console.log('Form submitted:', values);
        alert('Registration successful!');
    };

    // Render fields based on the current step
    const renderStepFields = () => {
        switch (step) {
            case 1:
                return (

                    <div className="flex justify-center items-center mt-48">
                        <div className="flex flex-col justify-center items-center">
                        <>
                        <InputField id="name" name="name" type="text" placeholder="Name" />
                        <InputField id="email" name="email" type="email" placeholder="Email" />
                    </>
                        </div>
                        
                    </div>
                    
                );
            case 2:
                return (
                    <>
                        <InputField id="username" name="username" type="text" placeholder="Username" />
                        <InputField id="password" name="password" type="password" placeholder="Password" />
                    </>
                );
            case 3:
                return (
                    //Drop down for student or Teacher
                    <>
                        <DropdownField
                            id="userType"
                            name="userType"
                            label="User Type"
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'teacher', label: 'Teacher' },
                                { value: 'student', label: 'Student' },
                            ]}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[step - 1]} // Use the schema for the current step
            onSubmit={(values, { setSubmitting }) => {
                if (step === 3) {
                    handleSubmit(values); // Final submission
                } else {
                    setStep(step + 1); // Move to the next step
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, isValid }) => (
                <Form className="space-y-4">
                    {renderStepFields()}

                    <div className="flex justify-between">
                        {step > 1 && (
                            <Button
                                type="button"
                                onClick={() => setStep(step - 1)} // Go to the previous step
                                className="bg-gray-500 hover:bg-gray-600"
                            >
                                Previous
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600"
                            disabled={isSubmitting || !isValid}
                        >
                            {step === 3 ? 'Submit' : 'Next'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignupPage;