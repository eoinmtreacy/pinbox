import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getFriendDetails } from '../services/mockFriendsService';

import FriendCard from './FriendCard';

const FriendItem = ({ friend }) => {
    const [hovered, setHovered] = useState(false);
    const [details, setDetails] = useState(null);

    const handleMouseEnter = async () => {
        setHovered(true);
        try {
            const details = await getFriendDetails(friend.id);
            setDetails(details);
        } catch (error) {
            console.error('Error fetching friend details:', error);
        }
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setDetails(null);
    };

    return (
        <div
            className="relativeborder rounded-lg flex flex-col items-center focus:outline-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={friend.photoUrl} alt={friend.name} className="w-24 h-24 rounded-full mb-4" />
            <h3 className=" font-semibold text-base">{friend.name}</h3>
            <p className="text-gray-600 text-xs">{friend.location}</p>
            <p className="text-gray-600 text-sm">{friend.followerCount} Followers</p>
            <p className="text-gray-600 text-sm">{friend.pinboxCount} Pins</p>
            <button
                className={`mt-4 px-4 py-2 rounded ${
                    friend.isFollowing ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
                onClick={() => {
                    alert('This feature is under development.');
                }}
            >
                {friend.isFollowing ? 'Following' : 'Follow'}
            </button>
            {hovered && details && <FriendCard friend={details} />}
        </div>
    );
};

FriendItem.propTypes = {
    friend: PropTypes.shape({
        id: PropTypes.number.isRequired,
        photoUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        distance: PropTypes.number.isRequired,
        followerCount: PropTypes.number.isRequired,
        pinboxCount: PropTypes.number.isRequired,
        isFollowing: PropTypes.bool.isRequired,
    }).isRequired,
};

export default FriendItem;
