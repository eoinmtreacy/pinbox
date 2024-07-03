import React, { useState } from 'react';
import listIcon from '../Images/list.png';
import DropdownMenu from './DropdownMenu';

const HorizontalButtons = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="relative flex items-center space-x-4 mt-4">
            <div className="flex space-x-2">
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow">
                    Parks
                </button>
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow">
                    Restaurants
                </button>
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow">
                    Cafe
                </button>
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow">
                    Pubs
                </button>
            </div>
            <div className="relative flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow">
                <button className="flex items-center" onClick={toggleDropdown}>
                    <img src={listIcon} alt="List Icon" className="w-5 h-5 mr-2"/> Layers
                </button>
             
                {dropdownVisible && <DropdownMenu />}
            </div>
        </div>
    );
};

export default HorizontalButtons;