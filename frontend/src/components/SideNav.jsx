import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
import settingsIcon from '../Images/settings.png';
import home from '../Images/home.png';
import like from '../Images/like.png';
import friends from '../Images/friends.png';

export const SideNav = ({
    onPreferenceToggle,
    onFriendsToggle,
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
        <div className="w-[70px] h-full bg-blue-600 fixed left-0 top-0 flex flex-col items-center pt-4 pb-4">
            <img className="w-20 h-20 mb-4" alt="Logo" src={logo} />
            <div className="flex flex-col items-center flex-grow justify-around">

                <button className="relative group flex flex-col items-center mb-4" onClick={() => navigateTo('/mainpage')}>

                    <img className="w-6 h-6 mb-1" alt="Home Icon" src={home} />
                    <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">Home</span>
                </button>
                <button className="relative group flex flex-col items-center mb-4" onClick={() => navigateTo('/preference')}>
                    <img className="w-6 h-6 mb-1" alt="Like Icon" src={like} />
                    <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">Preference</span>
                </button>
                <button className="relative group flex flex-col items-center mb-4" onClick={() => navigateTo('/friends')}>
                    <img className="w-6 h-6 mb-1" alt="Friends Icon" src={friends} />
                    <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">Friends</span>
                </button>
                <button className="relative group flex flex-col items-center mb-4" onClick={() => navigateTo('/settings')}>
                    <img className="w-6 h-6 mb-1" alt="Settings Icon" src={settingsIcon} />
                    <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">Settings</span>
                </button>
            </div>
        </div>
    );
};

SideNav.propTypes = {
    onPreferenceToggle: PropTypes.func.isRequired,
    onFriendsToggle: PropTypes.func.isRequired,
};

export default SideNav;