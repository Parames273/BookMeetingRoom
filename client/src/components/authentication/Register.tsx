import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '../reusable/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import api from '../../api';
import { IRegister } from '../../typings';

/**
 * Register component for user registration.
 * 
 * @component Registration
 * @returns The rendered register form component.
 */
const Register: React.FC = () => {
    const navigate = useNavigate();

    const registerInitialValues = {
        userName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: ''
    };

    const registerValidationSchema = Yup.object().shape({
        userName: Yup.string().required('User Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password Should Match').required('Confirm Password is required'),
        gender: Yup.string().required('Gender is required'),
    });

    // Register new employee
    const handleRegister = async (values: IRegister, resetForm: () => void) => {
        try {
            const { ...registerValues } = values;
            const response = await axios.post(api.register, registerValues);
            if (response.status === 201) {
                toast.success('Registered Successfully');
            } else {
                toast.error('Registration failed');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-2xl w-full mx-auto mt-3 p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <Formik
                initialValues={registerInitialValues}
                validationSchema={registerValidationSchema}
                onSubmit={(values, { resetForm }) => handleRegister(values, resetForm)}
            >
                {() => (
                    <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* User Name */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name<span className="text-red-500">*</span></label>
                            <Field type="text" name="userName" id="userName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter User Name" required />
                            <ErrorMessage name="userName" component="div" className="mt-1 text-sm text-red-500" />
                        </div>
                        {/* Email */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                            <Field type="email" name="email" id="register-email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="example@gmail.com" required />
                            <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
                        </div>
                        {/* Phone Number */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number<span className="text-red-500">*</span></label>
                            <Field type="text" name="phoneNumber" id="phoneNumber" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Phone Number" required />
                            <ErrorMessage name="phoneNumber" component="div" className="mt-1 text-sm text-red-500" />
                        </div>
                        {/* Password */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
                            <Field type="password" name="password" id="register-password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Password" required />
                            <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                        </div>
                        {/* Confirm Password */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password<span className="text-red-500">*</span></label>
                            <Field type="password" name="confirmPassword" id="confirmPassword" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirm Password" required />
                            <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
                        </div>
                        {/* Gender */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
                            <Field as="select" name="gender" id="gender" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="mt-1 text-sm text-red-500" />
                        </div>
                        {/* Submit */}
                        <Button type="submit" label='Register' className="bg-green-500 hover:bg-green-700 col-span-1 sm:col-span-2" onClick={() => { }} />
                        {/* Login redirecting */}
                        <div className="mt-6 mb-4 flex items-center justify-between gap-x-6 col-span-full">
                            <span>Already Registered login here: <Link to="/" className="text-blue-500 hover:underline">
                                Login
                            </Link></span>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;