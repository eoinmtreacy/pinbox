import React from 'react';
import PropTypes from 'prop-types';

import HomeButton from './side-bottom_navbar_components/HomeButton';
import ToggleFeedButton from './side-bottom_navbar_components/ToggleFeedButton';
import ToggleFriendsButton from './side-bottom_navbar_components/ToggleFriendsButton';
import NewCollectionButton from './side-bottom_navbar_components/NewCollectionButton';
import LandingPageButton from './side-bottom_navbar_components/LandingPageButton';

export const SideNav = ({ showFeed, setShowFeed, showFriends, setShowFriends, isMobile, showCollection, setShowCollection }) => {
    return (

        <div className="SideNav flex-none w-1/24 h-full">
            <div className="w-[70px] h-full bg-blue-600 fixed left-0 top-0 flex flex-col items-center pt-4 pb-4">
                <LandingPageButton isMobile={isMobile}/>
                <div className="flex flex-col items-center flex-grow justify-around">
                    <HomeButton />
                    <NewCollectionButton showCollection={showCollection} setShowCollection={setShowCollection}/>
                    <ToggleFeedButton showFeed={showFeed} setShowFeed={setShowFeed} />
                    <ToggleFriendsButton showFriends={showFriends} setShowFriends={setShowFriends} />
                </div>
            </div>
        </div>
    );
};

SideNav.propTypes = {
    showFeed: PropTypes.bool.isRequired,
    setShowFeed: PropTypes.func.isRequired,
    showFriends: PropTypes.bool.isRequired,
    setShowFriends: PropTypes.func.isRequired
};

export default SideNav;
