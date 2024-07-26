import React, { useState } from 'react';
import PropTypes from 'prop-types';
import busyIcon from '../Images/busy.png';
import allIcon from '../Images/all_icon.png';
import fastFoodIcon from '../Images/fast_food.png';
import restaurantsIcon from '../Images/restaurant.png';
import cafeIcon from '../Images/cafe.png';

const HorizontalButtons = ({ filterPins, toggleHeatmap }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterClick = (subtype) => {
        if (selectedFilter === subtype) {
            setSelectedFilter(null);
            filterPins(null);
        } else {
            setSelectedFilter(subtype);
            filterPins(subtype);
        }
    };

    return (
        <div className="relative flex flex-wrap flex-col md:flex-row items-center md:items-start md:space-x-4 mt-4 md:justify-start justify-end">
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'all' ? 'bg-gray-300' : ''}`}
                    onClick={() => handleFilterClick('all')}
                >
                    <img src={allIcon} alt="All Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">All</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'fast_food' ? 'bg-gray-300' : ''}`}
                    onClick={() => handleFilterClick('fast_food')}
                >
                    <img src={fastFoodIcon} alt="Fast Food Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">Fast Food</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'restaurant' ? 'bg-gray-300' : ''}`}
                    onClick={() => handleFilterClick('restaurant')}
                >
                    <img src={restaurantsIcon} alt="Restaurants Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">Restaurants</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'cafe' ? 'bg-gray-300' : ''}`}
                    onClick={() => handleFilterClick('cafe')}
                >
                    <img src={cafeIcon} alt="Cafe Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">Cafe</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto"
                    onClick={toggleHeatmap}
                >
                    <img src={busyIcon} alt="Busyness Icon" className="w-5 h-5 mr-2 md:mr-0 button-icon" />
                    <span className="button-text">Busyness Layer</span>
                </button>
            </div>
        </div>
    );
};

HorizontalButtons.propTypes = {
    filterPins: PropTypes.func.isRequired,
    toggleHeatmap: PropTypes.func.isRequired,
};

export default HorizontalButtons;
