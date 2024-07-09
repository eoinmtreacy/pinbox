import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
import settingsIcon from '../Images/settings.png';
import profileIcon from '../Images/profile.png';
import home from '../Images/home.png';
import like from '../Images/like.png';
import friends from '../Images/friends.png';
import search from '../Images/search.png';
import timeIcon from '../Images/time.png';
import distanceIcon from '../Images/distance.png';
import pinsIcon from '../Images/pin.png';

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
    currentUser
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
        <div className="w-[70px] h-full bg-blue-600 fixed left-0 top-0 flex flex-col justify-around items-center pt-4 pb-4">
            <img className="w-20 h-20 mb-4" alt="Logo" src={logo} />
            {!currentUser ? (
                <>
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/login')}>
                    Login
                </button>
                <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/signup')}>
                    Sign Up
                </button>
                </>
            ) : 
                <>
                <p>Logged in as {currentUser}</p>
                 <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/login')}>
                    Log Out
                </button>           
                </>
            }
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/search')}>
                <img className="w-6 h-6 mb-1" alt="Search Icon" src={search} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/preference')}>
                <img className="w-6 h-6 mb-1" alt="Like Icon" src={like} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/friends')}>
                <img className="w-6 h-6 mb-1" alt="Friends Icon" src={friends} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/Profile')}>
                <img className="w-6 h-6 mb-1" alt="Profile Icon" src={profileIcon} />
            </button>
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/settings')}>
                <img className="w-6 h-6 mb-1" alt="Settings Icon" src={settingsIcon} />
            </button>
            <div className="flex flex-col items-center space-y-4 mt-4">
                <div className="flex flex-col items-center">
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
                    <img src={pinsIcon} alt="Pins Icon" className="w-6 h-6" />
                </div>
                <button onClick={() => setMode('Day')} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Day
                </button>
                <button onClick={() => setMode('Search Mode')} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Search Mode
                </button>
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
