import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../Images/profile.png';

export const BottomNav = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        // Container for the bottom navigation bar
        <div className="w-full h-[98px] bg-white fixed bottom-0 flex justify-around items-center">
            
            {/* Home Navigation Item */}
            <button
                className="flex flex-col items-center"
                onClick={() => navigateTo('/home')}
            >
                {/* Home Icon */}
                <img
                    className="w-6 h-6 mb-1"
                    alt="Home Icon"
                    src="https://c.animaapp.com/0aBwylXj/img/subtract.svg"
                />
                {/* Home Label */}
                <div className="text-[10px] font-medium text-black">
                    Home
                </div>
            </button>

            {/* Browse Place Navigation Item */}
            <button
                className="flex flex-col items-center opacity-50"
                onClick={() => navigateTo('/browse-place')}
            >
                {/* Browse Place Icon */}
                <img
                    className="w-6 h-6 mb-1"
                    alt="Browse Place Icon"
                    src="https://c.animaapp.com/0aBwylXj/img/icon-search.svg"
                />
                {/* Browse Place Label */}
                <div className="text-[10px] font-medium text-black">
                    Browse Place
                </div>
            </button>

            {/* Friend’s PinBox Navigation Item */}
            <button
                className="flex flex-col items-center opacity-50"
                onClick={() => navigateTo('/friends-pinbox')}
            >
                {/* Friend’s PinBox Icon */}
                <img
                    className="w-6 h-6 mb-1"
                    alt="Friend’s PinBox Icon"
                    src="https://c.animaapp.com/0aBwylXj/img/icon-radio.svg"
                />
                {/* Friend’s PinBox Label */}
                <div className="text-[10px] font-medium text-black">
                    Friend’s PinBox
                </div>
            </button>

            {/* Profile Navigation Item */}
            <button
                className="flex flex-col items-center opacity-50"
                onClick={() => navigateTo('/profile')}
            >
                {/* Profile Icon */}
                <img
                    className="w-6 h-6 mb-1"
                    alt="Profile Icon"
                    src={profileIcon}
                />
                {/* Profile Label */}
                <div className="text-[10px] font-medium text-black">
                    Profile
                </div>
            </button>
        </div>
    );
};

export default BottomNav;
