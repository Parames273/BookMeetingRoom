import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { LOGIN_REQUEST } from "../../constants";
import Button from "../reusable/Button";
import { Credentials, ErrorResponse } from "../../typings";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

/**
 * Login component for user authentication.
 * 
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const Login: React.FC = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });

    /**
     * Handles form submission.
     * 
     * @param {Credentials} values - The form values.
     */
    const handleSubmit = async (values: Credentials) => {
        setIsSubmitting(true);
        setServerError('');
        const payload = { email: values.email, password: values.password };
        dispatch({ type: LOGIN_REQUEST, payload: { credentials: payload, callBack } });
    };

    /**
     * Callback function for handling login success or error.
     * 
     * @param {boolean} success - Indicates if the login was successful.
     * @param {ErrorResponse | null} error - The error response, if any.
     */
    const callBack = (success: boolean, error: ErrorResponse | null) => {
        if (success) {
            navigate('/dashboard', { replace: true });
        } else if (error && error.status === 401 && !success) {
            setServerError('Wrong Credentials..');
            toast.error(error.response.data.message);
        } else {
            setServerError(error?.response.data.message || 'An unexpected error occurred');
            toast.error(error?.response.data.message);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-md w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-4 md:space-y-6">
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email <sup className="text-red-500">*</sup></label>
                        <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="example@gmail.com" required />
                        <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password <sup className="text-red-500">*</sup></label>
                        <Field type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Minimum length of 8" required />
                        <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                    </div>

                    {/* Submit */}
                    <div className="mt-6 mb-4 flex items-center justify-between gap-x-6">
                        <Button
                            label={isSubmitting ? 'Logging in..' : 'Login'}
                            className="bg-green-500 hover:bg-green-700 w-full"
                            onClick={() => { }}
                            type="submit"
                        />
                    </div>

                    {/* Server error message */}
                    {serverError && (
                        <div className="mb-4 text-sm text-red-500">
                            {serverError}
                        </div>
                    )}

                    {/* New User redirecting */}
                    <div className="mt-6 mb-4 flex items-center justify-between gap-x-6">
                        <span>New user? Register here: <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link></span>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;