import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../auth/AuthContext";

import profileIcon from "../../../Images/profile.png";

const ProfileRegister = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { pinbox_id } = useParams();

    if (user !== null) {
        return (
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(`/profile/${pinbox_id}`)}>
                <img src={profileIcon} alt="Profile Icon" className="w-6 h-6" />
                <span className="text-gray-700 text-xs">{user}</span>
            </div>
        )
    }
    else {
        return (
            <button
                onClick={() => navigate('/signup')}
                className="text-xs bg-blue-500 text-white rounded p-1"
            >
                Sign Up
            </button >
        )
    }
};

export default ProfileRegister;