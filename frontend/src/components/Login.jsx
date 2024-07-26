import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loginimg from '../Images/logo.png';
import '../App.css';
import 'leaflet/dist/leaflet.css';
import axios from '../api/axios';
import { useAuthContext } from '../auth/AuthContext';

// Login component
function Login() {
    const [error, setError] = useState(null);
    const { isAuth, setAuth, user, setUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate(`/mainpage/${user}`); // Navigate to the main page if already logged in
        }
    }, [isAuth, user, navigate]);

    const handleLoginClick = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await axios.post('/user/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

        } catch (error) {
            setError(error.response.data.message);
            return;
        }

        try {
            const response = await axios.get('/user/auth', { withCredentials: true });
            if (response.status === 200) {
                setAuth(true);
                setUser(response.data.pinboxId);
                navigate(`/mainpage/${response.data.pinboxId}`);
            }

        } catch (error) {
            console.error(error);
        }

    };

    const handleForgotPasswordClick = () => {
        navigate('/passwordfind'); // Navigate to the password find page
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    const handleGuestLoginClick = (event) => {
        event.preventDefault();
        navigate('/mainpage'); // Navigate to the mainpage
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
                <button
                    className="flex flex-col mx-auto mb-4 cursor-pointer"
                    onClick={() => navigate('/LandingPage')}
                >
                    <img src={Loginimg} alt="Pinbox Logo" className="w-40 h-40" />
                </button>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={(e) => handleLoginClick(e)}>
                    <div className="mb-8">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded w-full py-3 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border rounded w-full py-3 px-3 text-grey-darker mb-3"
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <button
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            onClick={handleForgotPasswordClick}
                            type="button"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-4 rounded-[30px]"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <button
                    onClick={handleSignUpClick}
                    className="justify-center px-6 py-3 mt-10 max-w-full text-2xl font-bold text-center bg-white border border-solid border-slate-500 rounded-[30px] text-slate-500 w-full cursor-pointer"
                >
                    Sign Up
                </button>
                <button
                    onClick={handleGuestLoginClick}
                    className="justify-center px-6 py-3 mt-4 max-w-full text-2xl font-bold text-center bg-gray-200 border border-solid border-gray-400 rounded-[30px] text-gray-700 w-full cursor-pointer"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}

export default Login;
