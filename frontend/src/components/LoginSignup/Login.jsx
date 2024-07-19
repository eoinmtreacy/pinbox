import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuthContext } from '../auth/AuthContext';
import Google from '../../Images/google.png';
import Linkedin from '../../Images/linkedin.png';
import Facebook from '../../Images/facebook.png';

const Login = ({ setIsSignUp }) => {
    const { isAuth, setAuth, user, setUser } = useAuthContext();
    const navigate = useNavigate();

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

    const handleForgotPasswordClick = () => {
        navigate('/passwordfind');
    };

    return (
        <form onSubmit={handleLoginClick} className="sign-in-form">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="email">
                    Email
                </label>
                <input type="email" id="email" className="border rounded w-full py-2 px-3" required />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" htmlFor="password">
                    Password
                </label>
                <input type="password" id="password" className="border rounded w-full py-2 px-3" required />
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
            <div className="flex gap-4 justify-center mt-3">
                <img src={Google} className="shrink-0 aspect-[0.93] w-[50px]" alt="Google" /> {/* Google Icon */}
                <img src={Facebook} className="shrink-0 aspect-square w-[55px]" alt="Facebook" /> {/* Facebook Icon */}
                <img src={Linkedin} className="shrink-0 aspect-[0.97] w-[53px]" alt="LinkedIn" /> {/* LinkedIn Icon */}
            </div>
            <div className="text-center mt-4">
                <button
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    type="button"
                    onClick={handleForgotPasswordClick}
                >
                    Forgot Password?
                </button>
            </div>
        </form>
    );
};

export default Login;
