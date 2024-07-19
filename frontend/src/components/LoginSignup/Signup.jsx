import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuthContext } from '../../auth/AuthContext';
import SignupPopup from './SignupPopup';

const Signup = ({ setIsSignUp }) => {
    const navigate = useNavigate();
    const { setAuth, setUser } = useAuthContext();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSetConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validatePassword = (password) => {
        /*At least one upper case English letter, (?=.*?[A-Z])
        At least one lower case English letter, (?=.*?[a-z])
        At least one digit, (?=.*?[0-9])
        At least one special character, (?=.*?[#?!@$%^&*-])
        Minimum eight in length .{8,} (with the anchors) */
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors(['Passwords do not match']);
            return;
        }

        if (!validatePassword(password)) {
            setPopupMessage(
                'Password must include at least one upper/lower case letter, number and one special character more than 8 letters.'
            );
            setShowPopup(true);
            return;
        }

        try {
            const response = await axios.post('/user/add-user', {
                email: e.target.email.value,
                pinboxId: e.target.pinboxId.value,
                password: e.target.password.value,
                username: e.target.email.value,
            });

            if (response.status !== 200) {
                alert('Sign up failed');
                return;
            }
        } catch (error) {
            console.error(error);
        }

        try {
            const response = await axios.post(
                '/user/login',
                {
                    email: e.target.email.value,
                    password: e.target.password.value,
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

    return (
        <div>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Sign up</h2>
                {errors.length > 0 &&
                    errors.map((error, index) => (
                        <div key={index} className="error-message text-red-500">
                            {error}
                        </div>
                    ))}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="pinbox_id">
                        Username
                    </label>
                    <input name="pinboxId" id="pinbox_id" className="border rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input name="email" type="email" id="email" className="border rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        className="border rounded w-full py-2 px-3"
                        value={password}
                        onChange={handleSetPassword}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        className="border rounded w-full py-2 px-3"
                        value={confirmPassword}
                        onChange={handleSetConfirmPassword}
                        required
                    />
                </div>
                {password === confirmPassword ? (
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </div>
                ) : (
                    <div className="text-red-500 text-center mb-4">Passwords must match</div>
                )}
            </form>
            {showPopup && <SignupPopup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default Signup;
