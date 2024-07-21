import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';

import Logo from '../Images/logo.png';
import SettingsIcon from '../Images/settings.png';
import Home from '../Images/home.png';
import Like from '../Images/like.png';
import Friends from '../Images/friends.png';
import Plus from '../Images/plus.png';

export const SideNav = ({ onPreferenceToggle, onFriendsToggle }) => {
    const navigate = useNavigate();
    const { pinbox_id, collection } = useParams();
    const { isAuth } = useAuthContext();

    const addCollection = () => {
        if (isAuth) {
            const collection = prompt('Enter collection name');
            if (collection !== null) {
                // normalise colection name to be url safe
                const normalisedCollection = collection.replace(/ /g, '-').toLowerCase();
                navigate(`/mainpage/${pinbox_id}/${normalisedCollection}`);
            }
        }
    };

    return (
        <>
            <div className="w-[70px] h-full bg-blue-600 fixed left-0 top-0 flex flex-col items-center pt-4 pb-4">
                <img className="w-20 h-20 mb-4" alt="Logo" src={Logo} />
                <div className="flex flex-col items-center flex-grow justify-around">
                    <button
                        className="relative group flex flex-col items-center mb-4"
                        onClick={() => navigate('/mainpage')}
                    >
                        <img className="w-6 h-6 mb-1" alt="Home Icon" src={Home} />
                        <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                            Home
                        </span>
                    </button>
                    <button className="relative group flex flex-col items-center mb-4" onClick={() => addCollection()}>
                        <img className="w-6 h-6 mb-1" alt="Plus Icon" src={Plus} />
                        <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                            AddPinbox
                        </span>
                    </button>
                    <button
                        className="relative group flex flex-col items-center mb-4"
                        onClick={() => onPreferenceToggle()}
                    >
                        <img className="w-6 h-6 mb-1" alt="Like Icon" src={Like} />
                        <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                            Preference
                        </span>
                    </button>
                    <button
                        className="relative group flex flex-col items-center mb-4"
                        onClick={() => onFriendsToggle()}
                    >
                        <img className="w-6 h-6 mb-1" alt="Friends Icon" src={Friends} />
                        <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                            Friends
                        </span>
                    </button>
                    <button
                        className="relative group flex flex-col items-center mb-4"
                        onClick={() => navigate('/settings')}
                    >
                        <img className="w-6 h-6 mb-1" alt="Settings Icon" src={SettingsIcon} />
                        <span className="absolute bottom-[-1.5rem] bg-blue-600 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">
                            Settings
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

SideNav.propTypes = {
    onPreferenceToggle: PropTypes.func.isRequired,
    onFriendsToggle: PropTypes.func.isRequired,
};

export default SideNav;
