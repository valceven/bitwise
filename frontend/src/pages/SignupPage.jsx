import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/fields/InputField';
import Button from '../components/buttons/PurpleButton';
import DropdownField from '../components/fields/DropDownField';
import Stepper from '../components/Stepper'; 
import logo from '../assets/logo.png'; 
import { authApi } from '../api/auth/authApi';

const SignupPage = () => {
    const [step, setStep] = useState(1); // Track the current step

    const initialValues = {
        name: '',
        email: '',
        username: '',
        password: '',
        userType: '',
    };

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
            userType: Yup.string().required('User type is required'),
        }),
    ];

    const handleSubmit = async (values) => {
        console.log('Form submitted:', values);
        if (values.userType === 'admin') {
            values.userType = '7';
        } else if (values.userType === 'teacher') {
            values.userType = '1';
        } else if (values.userType === 'student') {
            values.userType = '2';
        }
        try {
            const response = await authApi.registerUser(values);
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const renderStepFields = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h1 className="text-3xl font-bold text-black-500 mb-4">
                        Let's start  with your name & email
                    </h1>

                    <h6 className="text-xs  text-black-500 mb-4 addinter">
                        This helps us personalize your experience. Don’t worry, we won’t share your info!
                    </h6>
                        <label>Enter your name</label>
                        <InputField id="name" name="name" type="text" placeholder="" />
                        <label>Enter your email</label>
                        <InputField id="email" name="email" type="email" placeholder="user@bitwise.io" />
                    </>
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
       
            <div className="w-1/2 flex flex-col justify-center items-center min-h-screen mx-auto">
                <img src={logo} alt="Logo" className="w-30 h-6 mb-10" />

                <Stepper step={step} />
                
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemas[step - 1]}
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
                        <Form className="w-3/4 space-y-4">
                            {renderStepFields()}

                            <div className="flex justify-between">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => setStep(step - 1)} 
                                        className="bg-gray-500 hover:bg-gray-600 btn-shadow addgrotesk"
                                    >
                                        Previous
                                    </Button>
                                )}
                                <Button
                                    type="submit" 
                                    className="bg-blackz-500 btn-shadow addgrotesk"
                                    disabled={isSubmitting || !isValid} 
                                >
                                    {step === 3 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        
    );
};

export default SignupPage;