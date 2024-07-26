import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuthContext } from '../auth/AuthContext';
import '../App.css';
import logo from '../Images/mascot.png'; // Import your logo or any image here

function Signup() {
    const navigate = useNavigate();
    const { isAuth, setAuth, user, setUser } = useAuthContext();

    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSetPassword = (e) => {
        setPassword(e.target.value);
        setErrors([]);
    };

    const handleSetConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setErrors([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/user/add-user', {
                email: e.target.email.value,
                pinboxId: e.target.pinboxId.value,
                password: e.target.password.value,
                username: e.target.email.value,
            });

        } catch (error) {
            setErrors(error.response.data.errors.$values);
            return;
        }

        try {
            const response = await axios.post('/user/login', {
                email: e.target.email.value,
                password: e.target.password.value
            }, {
                withCredentials: true 
            });
            if (response.status !== 200) {
                throw new Error(response.data.errors.$values);
            }

        } catch (error) {
            setErrors(error);
            return;
        }

        try {
            const response = await axios.get('/user/auth', { withCredentials: true });
            if (response.status === 200) {
                setAuth(true);
                setUser(response.data.pinboxId);
                navigate(`/${response.data.pinboxId}`);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
            <button onClick={() => navigate('/LandingPage')} className="mb-8 w-40 h-40 cursor-pointer">
                <img src={logo} alt="Pinbox Logo" className="w-full h-full" />
            </button>
            <h1 className="text-center text-2xl font-bold my-4">Sign up to the Pinbox Community</h1>
            <div className="max-w-sm w-full mx-auto p-8 rounded-lg border-solid border-[#020202] mb-4">
                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && errors.map((error, index) => (
                        <div key={index} className="error-message">
                            {error}
                        </div>
                    ))}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="pinbox_id">
                            Pinbox ID
                        </label>
                        <input
                            name="pinboxId"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            value={password}
                            onChange={handleSetPassword}
                            required
                        />
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            value={confirmPassword}
                            onChange={handleSetConfirmPassword}
                            required
                        />
                    </div>

                    {password === confirmPassword ? (
                        <div className="flex justify-center">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[30px]"
                                type="submit"
                            >
                                Sign up
                            </button>
                        </div>
                    ) : (
                        <div>
                            Passwords must match
                        </div>
                    )}
                </form>
                <button
                    onClick={() => navigate('/login')}
                    className="justify-center px-6 py-3 mt-4 max-w-full text-xl font-bold text-center bg-white border border-solid border-slate-500 rounded-[30px] text-slate-500 w-full cursor-pointer"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="justify-center px-6 py-3 mt-4 max-w-full text-xl font-bold text-center bg-gray-200 border border-solid border-gray-400 rounded-[30px] text-gray-700 w-full cursor-pointer"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}

export default Signup;
