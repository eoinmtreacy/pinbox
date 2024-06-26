import * as React from 'react';
import Logo from '../Images/logo.png';
import Google from '../Images/google.png';
import Linkedin from '../Images/linkedin.png';
import Facebook from '../Images/facebook.png';
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

    return (
        <div className="flex flex-col items-center px-9 pt-5 pb-16 mx-auto w-full border border-solid border-[#020202] bg-white max-w-[480px]">
            {/* Empty div for potential future use */}
            <div className="flex gap-5 justify-between self-stretch"></div>

            {/* Logo container */}
            <div className="flex flex-col mt-32 max-w-full rounded-none bg-blue-600 w-[199px]">
                <img src={Logo} alt="PinBox Logo" /> {/* Company Logo */}
            </div>

            {/* Welcome message */}
            <div className="mt-11 text-4xl font-bold tracking-tight text-center text-black">Hello!</div>

            {/* Subtitle message */}
            <div className="mt-7 text-xl font-bold tracking-tight text-center text-neutral-400">
                Welcome to PinBox, where <br />
                you can share your favourite places
            </div>

            {/* Login button */}
            <button
                onClick={handleLoginClick}
                className="justify-center px-6 py-4 mt-16 max-w-full text-3xl font-bold text-center text-white whitespace-nowrap border border-solid bg-slate-500 border-slate-500 rounded-[30px] w-[313px] cursor-pointer"
            >
                Login
            </button>

            {/* Sign-up button */}
            <button
                onClick={handleSignUpClick}
                className="justify-center px-6 py-4 mt-12 max-w-full text-3xl font-bold text-center bg-white border border-solid border-slate-500 rounded-[30px] text-slate-500 w-[313px] cursor-pointer"
            >
                Sign Up
            </button>

            {/* Sign-up using other services message */}
            <div className="mt-11 text-xl font-bold tracking-tight text-center text-neutral-400">Sign up using</div>

            {/* Icons for social login options */}
            <div className="flex gap-5 justify-between mt-3.5">
                <img src={Google} className="shrink-0 aspect-[0.93] w-[61px]" alt="Google" /> {/* Google Icon */}
                <img src={Facebook} className="shrink-0 aspect-square w-[65px]" alt="Facebook" /> {/* Facebook Icon */}
                <img src={Linkedin} className="shrink-0 aspect-[0.97] w-[63px]" alt="LinkedIn" /> {/* LinkedIn Icon */}
            </div>
        </div>
    );
}

export default Main;