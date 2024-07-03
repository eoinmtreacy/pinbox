import React from 'react';
import busyIcon from '../Images/busy.png';
import crimeIcon from '../Images/crime.png';
import airQualityIcon from '../Images/air_quality.jpg';

const DropdownMenu = () => {
    return (
        <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
            <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                <img src={busyIcon} alt="Busyness Icon" className="w-5 h-5 mr-2"/> Busyness Layer 
            </button>
            <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                <img src={crimeIcon} alt="Crime Icon" className="w-5 h-5 mr-2"/> Crime Rate Layer
            </button>
            <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                <img src={airQualityIcon} alt="Air Quality Icon" className="w-5 h-5 mr-2"/> Air Quality Layer
            </button>
        </div>
    );
};

export default DropdownMenu;