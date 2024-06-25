import React from 'react';
import listIcon from '../Images/list.png';
import mapIcon from '../Images/map.png';

const HorizontalButtons = () => {
    return (
        <div className="flex items-center space-x-4">
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
            <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow">
                <button className="flex items-center">
                    <img src={listIcon} alt="List Icon" className="w-5 h-5 mr-2"/>
                </button>
                <button className="flex items-center">
                    <img src={mapIcon} alt="Map Icon" className="w-5 h-5 mr-2"/>
                </button>
            </div>
        </div>
    );
};

export default HorizontalButtons;
