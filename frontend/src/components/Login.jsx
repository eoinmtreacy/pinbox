import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loginimg from '../Images/appimage.png'; // Importing the Login image
import '../App.css'; // Importing custom CSS
import 'leaflet/dist/leaflet.css'; // Importing Leaflet CSS for map styling

// Login component
function Login() {
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Function to handle login button click
    const handleLoginClick = (event) => {
        event.preventDefault(); // Prevent the default form submission
        navigate('/map'); // Navigate to the map page on login
    };

    // Function to handle forgot password button click
    const handleForgotPasswordClick = () => {
        navigate('/passwordfind'); // Navigate to the password find page
    };

    return (
        // Container for the entire login component
        <div className="container px-4">
            {/* Login title */}
            <h1 className="text-center text-2xl font-bold my-4">Login</h1>
            {/* Form container */}
            <div className="max-w-sm mx-auto p-8 rounded-lg border border-solid border-[#020202]">
                {/* Login image */}
                <img src={Loginimg} alt="Loginimg" className="mx-auto" />
                {/* Login form */}
                <form>
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
                            onClick={handleLoginClick}
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