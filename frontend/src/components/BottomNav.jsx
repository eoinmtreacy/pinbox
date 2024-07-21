import React from 'react';
import PropTypes from 'prop-types';
import homeIcon from '../Images/home.png';
import preferencesIcon from '../Images/like.png';
import friendsIcon from '../Images/friends.png';
import aboutUsIcon from '../Images/about-us-icon.png';

const BottomNav = ({ onPreferenceToggle, onFriendsToggle }) => {
    return (
        <div className="BottomNav">
            <button onClick={() => window.location.href = '/'}>
                <img src={homeIcon} alt="Home" className="w-6 h-6" />
            </button>
            <button onClick={onPreferenceToggle}>
                <img src={preferencesIcon} alt="Preferences" className="w-6 h-6" />
            </button>
            <button onClick={onFriendsToggle}>
                <img src={friendsIcon} alt="Friends" className="w-6 h-6" />
            </button>
            <button onClick={() => window.location.href = '/landingpage'}>
                <img src={aboutUsIcon} alt="About Us" className="w-6 h-6" />
            </button>
        </div>
    );
};

BottomNav.propTypes = {
    onPreferenceToggle: PropTypes.func.isRequired,
    onFriendsToggle: PropTypes.func.isRequired,
};

export default BottomNav;
