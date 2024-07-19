import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loginimg from '../Images/logo.png';
import '../App.css';
import 'leaflet/dist/leaflet.css';
import axios from '../api/axios';
import { useAuthContext } from '../auth/AuthContext';

// Login component
function Login() {
    const { isAuth, setAuth, user, setUser } = useAuthContext();
    // Hook to navigate programmatically
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate(`/mainpage/${user}`); // Navigate to the main page if already logged in
        }
    }, [isAuth, user, navigate]);

    // Function to handle login button click
    const handleLoginClick = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await axios.post(
                '/user/login',
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status !== 200) {
                alert('Login failed');
                return;
            }
        } catch (error) {
            console.error(error);
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

    // Function to handle forgot password button click
    const handleForgotPasswordClick = () => {
        navigate('/passwordfind'); // Navigate to the password find page
    };

    return (
        // Container for the entire login component
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Form container */}
            <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
                {/* Login image */}
                <img src={Loginimg} alt="Loginimg" className="mx-auto mb-4" />
                {/* Login form */}
                <form onSubmit={(e) => handleLoginClick(e)}>
                    {/* Email field */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    {/* Password field */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            required
                        />
                    </div>
                    {/* Forgot Password button styled as link */}
                    <div className="mb-4 text-center">
                        <button
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            onClick={handleForgotPasswordClick}
                            type="button"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    {/* Login button */}
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
