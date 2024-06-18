import React from 'react';
import map from '../Images/map.png'; 
import list from '../Images/list.png'; 
import '../App.css'; 
import UserProfileBox from './UserProfileBox'; 

const Header = () => {
    return (
        // Main container for the header with flexbox layout
        <div className="flex gap-4 items-center p-4">


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