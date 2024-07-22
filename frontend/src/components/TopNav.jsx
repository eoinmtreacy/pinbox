import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import axios from '../api/axios';
import timeIcon from '../Images/time.png';
import distanceIcon from '../Images/distance.png';
import profileIcon from '../Images/profile.png';

const TopNav = ({
    timeStamp,
    setTimeStamp,
    distance,
    setDistance,
    showPins,
    setShowPins,
    mode,
    setMode
}) => {
    const { isAuth, setAuth, user, setUser } = useAuthContext();
    const { pinbox_id } = useParams();
    const navigate = useNavigate();

    const [currentHour, setCurrentHour] = useState(0);

    useEffect(() => {
        const getTimeInManhattan = () => {
            const now = new Date();
            const offset = -4; // EDT (Eastern Daylight Time) UTC offset during daylight saving time
            const utcHour = now.getUTCHours();
            const currentHourInManhattan = (utcHour + offset + 24) % 24;
            setCurrentHour(currentHourInManhattan);
            setTimeStamp(currentHourInManhattan);
        };
        getTimeInManhattan();
    }, [setTimeStamp]);

    const handleLoginLogoutClick = async () => {
        if (user == null) {
            navigate('/login'); 
        } else {
            try {
                const response = await axios.get('/user/logout', { withCredentials: true });
                if (response.status === 200) {
                    setAuth(false);
                    setUser(null);
                    navigate('/mainpage');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleProfileClick = () => {
        navigate(`/profile/${pinbox_id}`);
    };

    const getCurrentTimeLabel = (offset) => {
        const date = new Date();
        date.setHours((currentHour + offset) % 24);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const getTimeLabel = (time) => {
        const now = new Date();
        const sliderTime = (currentHour + time) % 24;
        const isTomorrow = sliderTime < currentHour || (sliderTime === 0 && currentHour >= 22); // Edge case check
        return `${isTomorrow ? 'Tomorrow ' : ''}${getCurrentTimeLabel(time)}`;
    };

    return (
        <div className="w-full bg-white flex justify-between items-center p-2 shadow-md top-nav">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center mx-2">
                    <span className="text-gray-700 text-xs mb-1">Time</span>
                    <img src={timeIcon} alt="Time Icon" className="w-6 h-6 mb-1" />
                    <input
                        type="range"
                        min="0"
                        max="23"
                        value={(timeStamp - currentHour + 24) % 24}
                        onChange={(e) => setTimeStamp((currentHour + parseInt(e.target.value)) % 24)}
                        className="w-full h-4 accent-blue-800" // Adjust width
                        style={{ cursor: 'pointer' }}
                    />
                        <div className="absolute inset-x-0 flex justify-between text-xs text-gray-700 top-full mt-1">

                            <span className="absolute left-0 transform -translate-x-1">{getTimeLabel(0)}</span>
                            <span className="absolute right-0 transform translate-x-1">{getTimeLabel(23)}</span>
                    </div>
                    <div className="text-gray-700 text-xs mt-1">
                        {getTimeLabel((timeStamp - currentHour + 24) % 24)}
                    </div>
                </div>
                <div className="flex flex-col items-center mx-2">
                    <span className="text-gray-700 text-xs mb-1">Distance</span>
                    <img src={distanceIcon} alt="Distance Icon" className="w-6 h-6 mb-1" />
                    <input
                        type="range"
                        min="100"
                        max="1000"
                        value={distance}
                        onChange={(e) => setDistance(parseInt(e.target.value))}
                        className="w-16"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="showPins"
                        name="showPins"
                        checked={showPins}
                        onChange={(e) => setShowPins(e.target.checked)}
                        className="h-5 w-5 rounded-full"
                    />
                    <span className="text-gray-700 text-xs">{showPins ? 'Hide Pins' : 'Show Pins'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="daySelect" className="text-gray-700 text-xs">Day</label>
                    <select
                        id="daySelect"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="bg-white border border-gray-300 rounded p-1 text-xs"
                    >
                        {['Today', 'Tomorrow', 'Day After Tomorrow'].map(day => ( 
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                
                {user != null ? (
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
                        <img src={profileIcon} alt="Profile Icon" className="w-6 h-6" />
                        <span className="text-gray-700 text-xs">{user}</span>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-xs bg-blue-500 text-white rounded p-1"
                    >
                        Sign up
                    </button>
                )}

                <button
                    onClick={handleLoginLogoutClick}
                    className="text-xs bg-blue-500 text-white rounded p-1"
                >
                    {user != null ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    );
};

TopNav.propTypes = {
    timeStamp: PropTypes.number.isRequired,
    setTimeStamp: PropTypes.func.isRequired,
    distance: PropTypes.number.isRequired,
    setDistance: PropTypes.func.isRequired,
    showPins: PropTypes.bool.isRequired,
    setShowPins: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired
};

export default TopNav;
