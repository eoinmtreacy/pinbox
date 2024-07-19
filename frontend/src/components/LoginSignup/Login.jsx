import React from 'react';
import { useNavigate } from 'react-router-dom';
import Google from '../../Images/google.png';
import Linkedin from '../../Images/linkedin.png';
import Facebook from '../../Images/facebook.png';

const Login = ({ setIsSignUp }) => {
    const navigate = useNavigate();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        navigate('/mainpage');
    };

    return (
        <div>
            {' '}
            <form onSubmit={handleLoginSubmit} className="sign-in-form">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input type="email" id="email" className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" className="border rounded w-full py-2 px-3" />
                </div>
                <div className="flex justify-center">
                    <button
                        className="w-full bg-blue-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <div className="flex justify-center">
                    <button
                        className="w-full mt-4 bg-blue-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Log in as Guest
                    </button>
                </div>

                <div className="text-center mt-4">
                    <button
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        type="button"
                        onClick={() => navigate('/passwordfind')}
                    >
                        Forgot Password?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
