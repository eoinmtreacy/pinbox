import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../../Images/home.png";

const HomeButton = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/mainpage')}>
                <img src={homeIcon} alt="Home" className="w-6 h-6" />
                <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                    Home
                </span>
            </button>
        </>
    )
}

export default HomeButton;

