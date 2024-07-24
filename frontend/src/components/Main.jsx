import React from 'react';
import Logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import custom CSS for additional styling

function Main() {
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes

    // Handler for login button click
    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };

    // Handler for sign-up button click
    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    // Handler for guest login button click
    const handleGuestLoginClick = (event) => {
        event.preventDefault(); // Prevent the default form submission
        navigate('/mainpage'); // Navigate to the mainpage
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col items-center px-6 pt-5 pb-10 mx-auto w-full bg-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-md">
                {/* Empty div for potential future use */}
                <div className="flex gap-5 justify-between self-stretch"></div>

                {/* Logo container */}
                <button
                    className="flex flex-col mt-0 max-w-fullrounded-none w-[250px] cursor-pointer"
                    onClick={() => navigate('/LandingPage')}
                >
                    <img src={Logo} alt="PinBox Logo" /> {/* Company Logo */}
                </button>

                {/* Welcome message */}
                <div className="mt-8 text-3xl font-bold tracking-tight text-center text-black">Hello!</div>

                {/* Subtitle message */}
                <div className="mt-5 text-lg font-bold tracking-tight text-center text-black">
                    Welcome to PinBox, where <br />
                    you can share your favourite places
                </div>

                {/* Login button */}
                <button
                    onClick={handleLoginClick}
                    className="justify-center px-6 py-3 mt-12 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap bg-slate-500 border-slate-500 rounded-[30px] w-full md:w-72 lg:w-96 cursor-pointer"
                >
                    Login
                </button>

                {/* Sign-up button */}
                <button
                    onClick={handleSignUpClick}
                    className="justify-center px-6 py-3 mt-6 max-w-full text-2xl font-bold text-center bg-white border border-solid border-slate-500 rounded-[30px] text-slate-500 w-full md:w-72 lg:w-96 cursor-pointer"
                >
                    Sign Up
                </button>

                {/* Guest login button */}
                <button
                    onClick={handleGuestLoginClick}
                    className="justify-center px-6 py-3 mt-6 max-w-full text-2xl font-bold text-center bg-gray-200 border border-solid border-gray-400 rounded-[30px] text-gray-700 w-full md:w-72 lg:w-96 cursor-pointer"
                >
                    Log in as Guest
                </button>
            </div>
        </div>
    );
}

export default Main;