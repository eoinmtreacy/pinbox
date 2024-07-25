import React from 'react';
import PropTypes from 'prop-types';
import aboutUsIcon from '../../Images/about-us-icon.png';
import HomeButton from './side-bottom_navbar_components/HomeButton';
import ToggleFeedButton from './side-bottom_navbar_components/ToggleFeedButton';
import ToggleFriendsButton from './side-bottom_navbar_components/ToggleFriendsButton';
import NewCollectionButton from './side-bottom_navbar_components/NewCollectionButton';
import LandingPageButton from './side-bottom_navbar_components/LandingPageButton';

const BottomNav = ({ showFeed, setShowFeed, showFriends, setShowFriends, isMobile }) => {
    return (
        <div className="BottomNav">
            <HomeButton />
            <NewCollectionButton />
            <ToggleFeedButton showFeed={showFeed} setShowFeed={setShowFeed} />
            <ToggleFriendsButton showFriends={showFriends} setShowFriends={setShowFriends} />
            <LandingPageButton isMobile={isMobile}/>
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
