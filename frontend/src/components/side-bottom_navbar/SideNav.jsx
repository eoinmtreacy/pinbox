import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';

import HomeButton from './side-bottom_navbar_components/HomeButton';

import Logo from '../../Images/logo.png';
import Like from '../../Images/like.png';
import Friends from '../../Images/friends.png';
import Plus from '../../Images/plus.png';
import ToggleFeedButton from './side-bottom_navbar_components/ToggleFeedButton';
import ToggleFriendsButton from './side-bottom_navbar_components/ToggleFriendsButton';
import NewCollectionButton from './side-bottom_navbar_components/NewCollectionButton';

export const SideNav = ({ showFeed, setShowFeed, showFriends, setShowFriends }) => {
    const navigate = useNavigate();

    return (

        <div className="SideNav flex-none w-1/24 h-full">
            <div className="w-[70px] h-full bg-blue-600 fixed left-0 top-0 flex flex-col items-center pt-4 pb-4">
                <button className="mb-4" onClick={() => navigate('/LandingPage')}>
                    <img className="w-20 h-20" alt="Logo" src={Logo} />
                </button>
                <div className="flex flex-col items-center flex-grow justify-around">
                    <HomeButton />
                    <NewCollectionButton />
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
