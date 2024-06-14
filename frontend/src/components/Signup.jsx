import React from 'react';
import Loginimg from '../Images/appimage.png';
import '../App.css';

function Signup() {
    return (
        <div className="container px-4">
            {/* Heading */}
            <h1 className="text-center text-2xl font-bold my-4">Sign up</h1>
            {/* Form Container */}
            <div className="max-w-sm mx-auto p-8 border rounded-lg border-gray-800">
                {/* Signup Image */}
                <img src={Loginimg} alt="Login" className="mx-auto mb-4" />
                {/* Signup Form */}
                <form>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
                            required
                        />
                    </div>
                    {/* Signup Button */}
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;