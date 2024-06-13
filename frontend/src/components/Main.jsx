import * as React from 'react';
import Logo from '../Images/logo.png';
import Google from '../Images/google.png';
import Linkedin from '../Images/linkedin.png';
import Facebook from '../Images/facebook.png';
import { useNavigate } from 'react-router-dom';
import '../App.css';
function Main() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleSignUpClick = () => {
        navigate('/signup');
    };
    return (
        <div className="flex flex-col items-center px-9 pt-5 pb-16 mx-auto w-full border border-solid border-[#020202] bg-white max-w-[480px]">
            <div className="flex gap-5 justify-between self-stretch"></div>
            <div className="flex flex-col mt-32 max-w-full rounded-none bg-zinc-300 w-[199px]">
                <img src={Logo} alt="" />
            </div>
            <div className="mt-11 text-4xl font-bold tracking-tight text-center text-black">Hello!</div>
            <div className="mt-7 text-xl font-bold tracking-tight text-center text-neutral-400">
                Welcome to PinBox, where <br />
                you can share your favourite places
            </div>
            <div
                onClick={handleLoginClick}
                className="justify-center px-6 py-4 mt-16 max-w-full text-3xl font-bold text-center text-white whitespace-nowrap border border-solid bg-slate-500 border-slate-500 rounded-[30px] w-[313px]"
            >
                Login
            </div>
            <div
                onClick={handleSignUpClick}
                className="justify-center px-6 py-4 mt-12 max-w-full text-3xl font-bold text-center bg-white border border-solid border-slate-500 rounded-[30px] text-slate-500 w-[313px]"
            >
                Sign Up
            </div>
            <div className="mt-11 text-xl font-bold tracking-tight text-center text-neutral-400">Sign up using</div>
            <div className="flex gap-5 justify-between mt-3.5">
                <img src={Google} className="shrink-0 aspect-[0.93] w-[61px]" alt="google" />
                <img src={Facebook} className="shrink-0 aspect-square w-[65px]" alt="facebook" />
                <img src={Linkedin} className="shrink-0 aspect-[0.97] w-[63px]" alt="linkedin" />
            </div>
        </div>
    );
}
export default Main;
