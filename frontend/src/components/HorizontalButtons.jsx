import React from 'react';
import busyIcon from '../Images/busy.png';

const HorizontalButtons = () => {
    return (
        <div className="relative flex flex-wrap flex-col md:flex-row items-center md:items-start md:space-x-4 mt-4 md:justify-start justify-end">
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto">
                    Parks
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto">
                    Restaurants
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto">
                    Cafe
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto">
                    <img src={busyIcon} alt="List Icon" className="w-5 h-5 mr-2"/> Busyness Layer
                </button>
            </div>
        </div>
    );
};

export default HorizontalButtons;
