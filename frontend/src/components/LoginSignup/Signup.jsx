import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsSignUp }) => {
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/User/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: e.target.email.value,
                    username: e.target.username.value,
                    pinbox_id: e.target.pinbox_id.value,
                    password: e.target.password.value,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.errors);
            }
            navigate(`/mainpage/${e.target.pinbox_id.value}`);
        } catch (errors) {
            console.error('Error:', errors);
        }
    };

    return (
        <form onSubmit={handleSignupSubmit} className="sign-up-form">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Sign up</h2>
            <div className="mb-4">
                <label className="blAlready have an account?ock text-sm font-semibold mb-2" htmlFor="pinbox_id">
                    Username
                </label>
                <input type="pinbox_id" id="pinbox_id" className="border rounded w-full py-2 px-3" required />
            </div>
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
                    Sign up
                </button>
            </div>
        </form>
    );
};

export default Signup;
