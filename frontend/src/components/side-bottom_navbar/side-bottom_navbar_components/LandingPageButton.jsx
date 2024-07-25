import React from "react";
import { useNavigate } from "react-router-dom";
import aboutUsIcon from "../../../Images/about-us-icon.png";
import Logo from "../../../Images/logo.png";

const LandingPageButton = ({ isMobile }) => {
    const navigate = useNavigate();

    return (
        <>
            {isMobile ? (
                <button onClick={() => navigate('/LandingPage')}>
                    <img src={aboutUsIcon} alt="About Us" className="w-6 h-6" />
                </button>

            ) : (

                <button onClick={() => navigate('/LandingPage')}>
                    <img className="w-20 h-20" alt="Logo" src={Logo} />
                </button>

            )}

        </>
    )
}

export default LandingPageButton;