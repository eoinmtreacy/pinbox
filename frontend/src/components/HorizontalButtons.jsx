import React, { useState } from 'react';
import PropTypes from 'prop-types';
import busyIcon from '../Images/busy.png';
import allIcon from '../Images/all_icon.png';
import fastFoodIcon from '../Images/fast_food.png';
import restaurantsIcon from '../Images/restaurant.png';
import cafeIcon from '../Images/cafe.png';

const HorizontalButtons = ({ filterPins, toggleHeatmap }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [heatmapOn, setHeatmapOn] = useState(true);

    useEffect(() => {
        // Apply the 'all' filter on initial render
        filterPins('all');
    }, []);

    const handleFilterClick = (subtype) => {
        if (selectedFilter === subtype) {
            setSelectedFilter(null);
            filterPins(null);
        } else {
            setSelectedFilter(subtype);
            filterPins(subtype);
        }
    };

    const handleAllFilterClick = () => {
        if (selectedFilter === 'all') {
            setSelectedFilter(null);
            filterPins('hide_all'); // Add a special case to hide all pins
        } else {
            setSelectedFilter('all');
            filterPins('all');
        }
    };

    const handleHeatmapToggle = () => {
        setHeatmapOn(!heatmapOn);
        toggleHeatmap();
    };

    return (
        <div className="relative flex flex-wrap flex-col md:flex-row items-center md:items-start md:space-x-4 mt-4 md:justify-start justify-end">
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'all' ? 'bg-blue-500 text-black' : 'bg-white text-gray-800'}`}
                    onClick={handleAllFilterClick}
                    title={selectedFilter === 'all' ? 'Hide all your pins' : 'Show all your pins'}
                >
                    <img src={allIcon} alt="All Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">All</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'fast_food' ? 'bg-blue-500 text-black' : 'bg-white text-gray-800'}`}
                    onClick={() => handleFilterClick('fast_food')}
                    title={selectedFilter === 'fast_food' ? 'Turn off the filter' : 'Show only the fast food options'}
                >
                    <img src={fastFoodIcon} alt="Fast Food Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">Fast Food</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'restaurant' ? 'bg-blue-500 text-black' : 'bg-white text-gray-800'}`}
                    onClick={() => handleFilterClick('restaurant')}
                    title={selectedFilter === 'restaurant' ? 'Turn off the filter' : 'Show only the restaurant options'}
                >
                    <img src={restaurantsIcon} alt="Restaurants Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">Restaurants</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${selectedFilter === 'cafe' ? 'bg-blue-500 text-black' : 'bg-white text-gray-800'}`}
                    onClick={() => handleFilterClick('cafe')}
                    title={selectedFilter === 'cafe' ? 'Turn off the filter' : 'Show only the cafe options'}
                >
                    <img src={cafeIcon} alt="Cafe Icon" className="w-5 h-5 button-icon" />
                    <span className="button-text">Cafe</span>
                </button>
            </div>
            <div className="relative flex flex-wrap w-full md:w-auto">
                <button
                    className={`flex items-center border border-gray-300 rounded-full px-4 py-2 shadow w-full md:w-auto ${!heatmapOn ? 'bg-blue-500 text-black' : 'bg-white text-gray-800'}`}
                    onClick={handleHeatmapToggle}
                    title={heatmapOn ? 'Turn off the heatmap' : 'Turn on the heatmap'}
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
