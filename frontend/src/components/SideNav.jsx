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

export const SideNav = ({ onPreferenceToggle, onFriendsToggle, }) => {
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
            <button className="flex flex-col items-center mb-4" onClick={() => navigateTo('/map')}>
                <img className="w-6 h-6 mb-1" alt="Home Icon" src={home} />
            </button>
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
                <img className="w-6 h-6 mb-1" alt="Profile Icon" src={settingsIcon} />
            </button>
        </div>
    );
};

SideNav.propTypes = {
    onPreferenceToggle: PropTypes.func.isRequired,
    onFriendsToggle: PropTypes.func.isRequired
};

export default SideNav;