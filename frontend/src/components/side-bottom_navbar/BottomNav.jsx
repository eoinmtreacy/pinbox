import React from 'react';
import PropTypes from 'prop-types';
import aboutUsIcon from '../../Images/about-us-icon.png';
import HomeButton from './side-bottom_navbar_components/HomeButton';
import ToggleFeedButton from './side-bottom_navbar_components/ToggleFeedButton';
import ToggleFriendsButton from './side-bottom_navbar_components/ToggleFriendsButton';

const BottomNav = ({ showFeed, setShowFeed, showFriends, setShowFriends }) => {
    return (
        <div className="BottomNav">
            <HomeButton />
           <ToggleFeedButton showFeed={showFeed} setShowFeed={setShowFeed} />
            <ToggleFriendsButton showFriends={showFriends} setShowFriends={setShowFriends} />
            <button onClick={() => window.location.href = '/landingpage'}>
                <img src={aboutUsIcon} alt="About Us" className="w-6 h-6" />
            </button>
        </div>
    );
};

BottomNav.propTypes = {
    showFeed: PropTypes.bool.isRequired,
    setShowFeed: PropTypes.func.isRequired,
    showFriends: PropTypes.bool.isRequired,
    setShowFriends: PropTypes.func.isRequired
};

export default BottomNav;
