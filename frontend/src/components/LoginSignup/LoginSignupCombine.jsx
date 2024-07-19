import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import logo from '../../Images/logo.png';
import signinSvg from '../../Images/LoginSignup/signin.svg';
import signupSvg from '../../Images/LoginSignup/signup.svg';

const LoginSignupCombine = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className={`auth-container relative flex w-full max-w-7xl bg-white rounded-lg shadow-md overflow-hidden ${
                    isSignUp ? 'sign-up-mode' : ''
                }`}
            >
                <div className="form-container w-full md:w-1/2 p-8">
                    <img src={logo} alt="Logo" className="mx-auto mb-4" />
                    <div className={`form-content ${isSignUp ? 'move-left' : 'move-right'}`}>
                        {isSignUp ? <Signup setIsSignUp={setIsSignUp} /> : <Login setIsSignUp={setIsSignUp} />}
                    </div>
                </div>
                <div className="panel-container hidden md:flex flex-col items-center justify-center bg-blue-500 text-white w-1/2 p-8">
                    <div className="text-center px-4">
                        <h3 className="text-2xl font-bold">
                            {isSignUp ? 'Already a member?' : 'Are you New to PinBox?'}
                        </h3>
                        <p className="mt-2">Be the member of Pinbox and experience more Places!</p>
                        <button
                            className="mt-4 bg-white text-blue-600 font-bold py-2 px-4 rounded"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Login' : 'Sign up'}
                        </button>
                    </div>
                    <img src={isSignUp ? signupSvg : signinSvg} alt="Illustration" className="w-full mt-4" />
                </div>
            </div>
        </div>
    );
};

export default LoginSignupCombine;
