import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuthContext } from '../../auth/AuthContext';
import SignupPopup from './SignupPopup';

const Login = ({ setIsSignUp }) => {
    const { isAuth, setAuth, user, setUser } = useAuthContext();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        if (isAuth) {
            navigate(`/mainpage/${user}`);
        }
    }, [isAuth, user, navigate]);

    const handleLoginClick = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

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
            if (error.response && error.response.status === 400) {
                setShowPopup(true);
                setPopupMessage('The password is incorrect');
            } else {
                console.error('Error during login:', error);
            }
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
            console.error('Error during authentication:', error);
        }
    };

    const handleForgotPasswordClick = () => {
        navigate('/passwordfind');
    };

    return (
        <div>
            <form onSubmit={handleLoginClick} className="sign-in-form">
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
            </form>
            <div className="flex justify-center">
                <button
                    className="w-full mt-4 bg-blue-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleForgotPasswordClick}
                >
                    Log in as Guest
                </button>
            </div>
            {showPopup && <SignupPopup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default Login;
