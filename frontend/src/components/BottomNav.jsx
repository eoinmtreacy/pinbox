import React from 'react';
import profileIcon from '../Images/profile.png';

export const BottomNav = () => {
    return (
        // Container for the bottom navigation bar
        <div className="w-full h-[98px] bg-white fixed bottom-0 flex justify-around items-center">
            
            {/* Home Navigation Item */}
            <div className="flex flex-col items-center">
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
            </div>

            {/* Browse Place Navigation Item */}
            <div className="flex flex-col items-center opacity-50">
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
            </div>

            {/* Friend’s PinBox Navigation Item */}
            <div className="flex flex-col items-center opacity-50">
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
            </div>

            {/* Profile Navigation Item */}
            <div className="flex flex-col items-center opacity-50">
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
            </div>
        </div>
    );
};

export default BottomNav;