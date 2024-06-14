import React from 'react';
import gyuwon from '../Images/gyuwon.png'; // Import the image for Gyuwon
import map from '../Images/map.png'; // Import the image for the map icon
import list from '../Images/list.png'; // Import the image for the list icon
import '../App.css'; // Import custom CSS for the app
import UserProfileBox from './UserProfileBox'; // Import the UserProfileBox component

const Header = () => {
    return (
        // Main container for the header with flexbox layout
        <div className="flex gap-4 items-center p-4">
            {/* Container for Gyuwon's PinBox section */}
            <div className="flex w-[290px] h-[59px] items-center gap-5 px-7 py-0 relative bg-[rgb(89,87,166)] rounded-[30px] overflow-hidden border border-solid border-[#020202]">
                {/* Text for Gyuwon's PinBox with flex-grow to take available space */}
                <span className="flex-grow text-center font-bold text-sm">Gyuwons PinBox</span>
                {/* Container for Gyuwon's image */}
                <div>
                    <img
                        className="w-14 h-12 rounded-full border border-solid border-[#020202] bg-[rgb(255,255,255)]"
                        src={gyuwon}
                        alt="Gyuwon"
                    />
                </div>
            </div>

            {/* UserProfileBox component */}
            <UserProfileBox isClickable={true} /> {/* Include the UserProfileBox component */}

            {/* Container for Map and List icons */}
            <div className="flex w-[149px] h-[57px] items-center gap-5 px-7 py-0 relative bg-[D9D9D9] rounded-[30px] overflow-hidden border border-solid border-[#020202] bg-[rgb(255,255,255)]">
                {/* Container for Map icon */}
                <div className="flex items-center rounded-full border border-solid border-[#020202]">
                    <img className="w-10 h-10 border-[#020202]" src={map} alt="Map" />
                </div>
                {/* List icon */}
                <img className="w-5 h-5 border-[#020202]" src={list} alt="List" />
            </div>
        </div>
    );
};

export default Header;