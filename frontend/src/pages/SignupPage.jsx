import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/fields/InputField';
import Button from '../components/buttons/PurpleButton';
import UserRoleButton from '../components/buttons/UserRoleButton';
import Stepper from '../components/Stepper';
import logo from '../assets/logo.png';
import { authApi } from '../api/auth/authApi';
import Background from '../components/Background';

const SignupPage = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1); // Track the current step
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: null,
        verificationCode: '',
    };

    const validationSchemas = [
        Yup.object({
            userType: Yup.string().required('User type is required'),
        }),
        Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
              .email('Invalid email address')
              .matches(/^[a-zA-Z0-9._%+-]+@cit\.edu$/, 'Email must be a valid cit.edu address')
              .required('Email is required'),
          }),          
        Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
                .max(25, 'Password must be at most 25 characters')
                .matches(/(?=.*[0-9])/, 'Password must contain a number'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        Yup.object({
            verificationCode: Yup.string()
                .required('Verification code is required')
                .length(6, 'Verification code must be 6 characters'),
        }),
    ];

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const response = await authApi.registerUser(values);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    

    const renderStepFields = (setFieldValue, values) => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h1 className="text-3xl font-bold text-black-500 mb-4">
                            Choose your role
                        </h1>
                        <h6 className="text-xs text-black-500 mb-4 addinter">
                            Are you a teacher or a student? Select the option that best describes you to personalize your experience.
                        </h6>
                        <div className="flex justify-center items-center mb-4 space-x-12">
                            <UserRoleButton
                                type="button"
                                onClick={() => {
                                    setFieldValue('userType', 1); 
                                
                                }}
                                className={`bg-amber-50 text-black hover:bg-gray-600 btn-shadow-square addgrotesk ${
                                    values.userType === 1? 'bg-bluez' : ''
                                }`} // Highlight selected button
                            >
                                Student
                            </UserRoleButton>
                            <UserRoleButton
                                type="button"
                                onClick={() => {
                                    setFieldValue('userType', 2);
                                    
                                }}
                                className={`bg-amber-50 text-black hover:bg-gray-600 btn-shadow-square addgrotesk ${
                                    values.userType === 2 ?'bg-bluez' : ''
                                }`} 
                            >
                                Teacher
                            </UserRoleButton>
                    </div>
                                        </>
                );
            case 2:
                return (
                    <>
                        <h1 className="text-3xl font-bold text-black-500 mb-4">
                            Let's start with your name & email
                        </h1>
                        <h6 className="text-xs text-black-500 mb-4 addinter">
                            This helps us personalize your experience. Don’t worry, we won’t share your info!
                        </h6>
                        <label>Enter your name</label>
                        <InputField id="name" name="name" type="text" placeholder="" />
                        <label>Enter your email</label>
                        <InputField id="email" name="email" type="email" placeholder="user@cit.edu" />
                    </>
                );
            case 3:
                return (
                    <>
                        <h1 className="text-3xl font-bold text-black-500 mb-4">
                            Almost there! Please enter your username & password
                        </h1>
                        <h6 className="text-xs text-black-500 mb-4 addinter">
                            This step helps secure your account. Rest assured, your information is safe with us!
                        </h6>
                        <label>Enter your username</label>
                        <InputField id="username" name="username" type="text" placeholder="Username" />
                        <label>Enter your password</label>
                        <InputField id="password" name="password" type="password" placeholder="Password" />
                        <label>Confirm password</label>
                        <InputField id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" />
                    </>
                );
                case 4:
                    return (
                            <>
                                 <h1 className="text-3xl font-bold text-black-500 mb-4">
                                        Verify Your Email
                                </h1>
                                <h6 className="text-xs text-black-500 mb-4 addinter">
                                         We’ve sent a 6-digit verification code to your email. Please enter it below to complete your registration.
                                </h6>
                                <label>Enter verification code</label>
                                <InputField id="verificationCode" name="verificationCode" type="text" placeholder="123456" />
                            </>
                    );
            default:
                return null;
        }
    };

    

    return (
        
        <div className="flex justify-center items-center bg-offwhite relative">
            <Background />
            <div className="relative z-10 w-1/2 flex flex-col justify-center items-center min-h-screen mx-auto">
            
            <img draggable='false' src={logo} alt="Logo" className="w-30 h-6 mb-10" />
            <div className="flex flex-col items-enter justify-center w-full mb-10">
                <Stepper step={step} />
            </div>
            {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader border-t-4 border-bluez rounded-full w-12 h-12 animate-spin"></div>
                        <p className="ml-4 text-lg text-gray-600">Processing...</p>
                    </div>
                ) : (

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemas[step - 1]}
                onSubmit={(values, { setSubmitting }) => {
                    setIsLoading(true); 
                    if (step === 4) {
                        setIsLoading(true); 
                        setTimeout(async () => {
                            try {
                                await handleSubmit(values); 
                            } catch (error) {
                                console.error('Error during submission:', error);
                            } finally {
                                setIsLoading(false);
                            }
                            setSubmitting(false);
                        }, 2000);
                    } else {
                        setStep(step + 1); 
                    }
                    setSubmitting(false);
                }}
            >
                {({ values, setFieldValue, isSubmitting, isValid }) => (
                    <Form className="w-3/4 space-y-4">
                        {renderStepFields(setFieldValue, values)}
                        <div className="flex justify-end space-x-10">
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
                                onClick={() => console.log(values)}
                                className="bg-bluez btn-shadow addgrotesk"
                                disabled={isSubmitting || !isValid}
                            >
                                {step === 4 ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>)}
        </div>
        </div>
        
    );
};

export default SignupPage;