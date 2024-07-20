import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import timeIcon from '../Images/time.png';
import distanceIcon from '../Images/distance.png';
import profileIcon from '../Images/profile.png';
import showPinsIcon from '../Images/pin.png';
import hidePinsIcon from '../Images/pin-x.png';
import searchIcon from '../Images/search.png'; // Import the search icon

const MobileIcons = ({
    timeStamp, setTimeStamp,
    distance, setDistance,
    showPins, setShowPins,
    mode, setMode,
    isLoggedIn, onLoginLogout
}) => {
    const navigate = useNavigate(); // Use useNavigate to navigate programmatically
    const [showTimeSlider, setShowTimeSlider] = useState(false);
    const [showDistanceSlider, setShowDistanceSlider] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false); // State for search bar visibility
    const { pinbox_id } = useParams()

    const toggleShowTimeSlider = () => setShowTimeSlider(!showTimeSlider);
    const toggleShowDistanceSlider = () => setShowDistanceSlider(!showDistanceSlider);
    const togglePins = () => setShowPins(!showPins);
    const toggleSearchBar = () => setShowSearchBar(!showSearchBar); // Toggle search bar visibility

    const handleProfileClick = () => {
        navigate(`/profile/${pinbox_id}`); // Navigate to the profile page
    };

    return (
        <div className="mobile-icons flex items-center justify-between">
            <div className="relative">
                <img src={searchIcon} alt="Search Icon" className="w-8 h-8" onClick={toggleSearchBar} />
                {showSearchBar && (
                    <div className="absolute top-12 left-0 right-0 rounded shadow-md" style={{ width: '50vw' }}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 rounded-full border border-solid border-gray-300"
                        />
                    </div>
                )}
            </div>
            <div className="relative">
                <img src={timeIcon} alt="Time Icon" className="w-8 h-8" onClick={toggleShowTimeSlider} />
                {showTimeSlider && (
                    <div className="absolute top-12 left-0 bg-white p-2 rounded shadow-md" style={{ width: '50vw' }}>
                        <input
                            type="range"
                            min="0"
                            max="23"
                            value={timeStamp}
                            onChange={(e) => setTimeStamp(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-700">
                            <span>0</span>
                            <span>23</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="relative">
                <img src={distanceIcon} alt="Distance Icon" className="w-8 h-8" onClick={toggleShowDistanceSlider} />
                {showDistanceSlider && (
                    <div className="absolute top-12 left-0 bg-white p-2 rounded shadow-md w-screen" style={{ width: '50vw' }}>
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-700">
                            <span>100</span>
                            <span>1000</span>
                        </div>
                    </div>
                )}
            </div>
            <img src={showPins ? hidePinsIcon : showPinsIcon} alt="Pins Icon" className="w-8 h-8" onClick={togglePins} />
            <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="bg-white border border-gray-300 rounded p-1 text-xs"
            >
                {['Today','Tommorow', 'Day After Tommorow'].map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            <img src={profileIcon} alt="Profile Icon" className="w-8 h-8 cursor-pointer" onClick={handleProfileClick} />
        </div>
    );
};

MobileIcons.propTypes = {
    timeStamp: PropTypes.number.isRequired,
    setTimeStamp: PropTypes.func.isRequired,
    distance: PropTypes.number.isRequired,
    setDistance: PropTypes.func.isRequired,
    showPins: PropTypes.bool.isRequired,
    setShowPins: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onLoginLogout: PropTypes.func.isRequired,
};

export default MobileIcons;
