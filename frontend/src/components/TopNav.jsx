import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
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
    setMode,
    isLoggedIn,
    onLoginLogout,
    userName
}) => {

    const { isAuth, setAuth, user, setUser } = useAuthContext();

    const navigate = useNavigate(); // Use useNavigate to navigate programmatically

    const handleLoginLogoutClick = async () => {
        if (user == null) {
            navigate('/login'); 
        } else {
            try {
                const response = await axios.get('/user/logout', { withCredentials: true })
                if (response.status == 200) {
                    console.log(response);
                    setAuth(false)
                    setUser(null)
                    navigate('/mainpage');
                }
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
    }

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the profile page
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
                        max="24"
                        value={timeStamp}
                        onChange={(e) => setTimeStamp(e.target.value)}
                        className="w-16"
                    />
                    <div className="flex justify-between w-16 text-xs text-gray-700">
                        <span>0</span>
                        <span>24</span>
                    </div>
                </div>
                <div className="flex flex-col items-center mx-2">
                    <span className="text-gray-700 text-xs mb-1">Distance</span>
                    <img src={distanceIcon} alt="Distance Icon" className="w-6 h-6 mb-1" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-16"
                    />
                    <div className="flex justify-between w-16 text-xs text-gray-700">
                        <span>0</span>
                        <span>100</span>
                    </div>
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

                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (

                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                
                {/* either display profile or sign up link */}
                {user != null ? (
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
                        <img src={profileIcon} alt="Profile Icon" className="w-6 h-6" />
                        <span className="text-gray-700 text-xs">{user}</span>
                    </div>
                ) 
            
                :
                
                <button
                    onClick={() => navigate('/signup')}
                    className="text-xs bg-blue-500 text-white rounded p-1"
                >
                    Sign up
                </button>}

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
    setMode: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onLoginLogout: PropTypes.func.isRequired,
};

export default TopNav;
