import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
import settingsIcon from '../Images/settings.png';
import profileIcon from '../Images/profile.png';
import home from '../Images/home.png';
import like from '../Images/like.png';
import friends from '../Images/friends.png';
import timeIcon from '../Images/time.png';
import distanceIcon from '../Images/distance.png';

export const SideNav = ({
    onPreferenceToggle,
    onFriendsToggle,
    timeStamp,
    setTimeStamp,
    distance,
    setDistance,
    showPins,
    setShowPins,
    mode,
    setMode,
}) => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        if (path === '/preference') {
            onPreferenceToggle();
        } else if (path === '/friends') {
            onFriendsToggle();
        } else {
            navigate(path);
        }
    };

    return (
        <div className="w-[70px] h-full bg-blue-600 fixed left-0 top-0 flex flex-col justify-between items-center pt-4 pb-4">
            <img className="w-20 h-20 mb-4" alt="Logo" src={logo} />
            <div className="flex flex-col items-center">
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/map')}>
                    <img className="w-6 h-6 mb-1" alt="Home Icon" src={home} />
                    <span className="text-white text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/preference')}>
                    <img className="w-6 h-6 mb-1" alt="Like Icon" src={like} />
                    <span className="text-white text-xs">Preference</span>
                </button>
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/friends')}>
                    <img className="w-6 h-6 mb-1" alt="Friends Icon" src={friends} />
                    <span className="text-white text-xs">Friends</span>
                </button>
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/profile')}>
                    <img className="w-6 h-6 mb-1" alt="Profile Icon" src={profileIcon} />
                    <span className="text-white text-xs">Profile</span>
                </button>
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/settings')}>
                    <img className="w-6 h-6 mb-1" alt="Settings Icon" src={settingsIcon} />
                    <span className="text-white text-xs">Settings</span>
                </button>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-4">
                <div className="flex flex-col items-center">
                    <span className="text-white text-xs mb-1">Adjust Time</span>
                    <img src={timeIcon} alt="Time Icon" className="w-6 h-6 mb-1" />
                    <input
                        type="range"
                        min="0"
                        max="24"
                        value={timeStamp}
                        onChange={(e) => setTimeStamp(e.target.value)}
                        className="w-16"
                    />
                    <div className="flex justify-between w-16 text-xs text-white">
                        <span>0</span>
                        <span>24</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-white text-xs mb-1">Adjust Distance</span>
                    <img src={distanceIcon} alt="Distance Icon" className="w-6 h-6 mb-1" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-16"
                    />
                    <div className="flex justify-between w-16 text-xs text-white">
                        <span>0</span>
                        <span>100</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="showPins"
                        name="showPins"
                        checked={showPins}
                        onChange={(e) => setShowPins(e.target.checked)}
                        className="h-5 w-5 rounded-full"
                    />
                    <span className="text-white text-xs">{showPins ? 'Hide Pins' : 'Show Pins'}</span>
                </div>
            </div>
        </div>
    );
};

SideNav.propTypes = {
    onPreferenceToggle: PropTypes.func.isRequired,
    onFriendsToggle: PropTypes.func.isRequired,
    timeStamp: PropTypes.number.isRequired,
    setTimeStamp: PropTypes.func.isRequired,
    distance: PropTypes.number.isRequired,
    setDistance: PropTypes.func.isRequired,
    showPins: PropTypes.bool.isRequired,
    setShowPins: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired,
};

export default SideNav;
