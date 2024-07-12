// FriendsList.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFriends, getFriendDetails } from '../services/friendsService';
import FriendCard from './FriendCard';

const FriendsList = ({ userId }) => {
    const [friends, setFriends] = useState([]);
    const [hoveredFriendId, setHoveredFriendId] = useState(null);
    const [hoveredFriendDetails, setHoveredFriendDetails] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await getFriends(userId);
                setFriends(data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [userId]);

    const handleMouseEnter = async (id) => {
        setHoveredFriendId(id);
        try {
            const details = await getFriendDetails(id);
            setHoveredFriendDetails(details);
        } catch (error) {
            console.error('Error fetching friend details:', error);
        }
    };

    const handleMouseLeave = () => {
        setHoveredFriendId(null);
        setHoveredFriendDetails(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Friends List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map(friend => (
                    <div
                        key={friend.id}
                        className="relative p-4 border rounded-lg flex flex-col items-center"
                        onMouseEnter={() => handleMouseEnter(friend.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img 
                            src={friend.photoUrl} 
                            alt={friend.name} 
                            className="w-24 h-24 rounded-full mb-4" 
                        />
                        <h3 className="text-xl font-semibold">{friend.name}</h3>
                        <p className="text-gray-600">{friend.location}</p>
                        <p className="text-gray-500">{friend.distance} miles away</p>
                        <p className="text-gray-600">{friend.followerCount} Followers</p>
                        <p className="text-gray-600">{friend.pinboxCount} Pins</p>
                        <button className={`mt-4 px-4 py-2 rounded ${friend.isFollowing ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                            {friend.isFollowing ? 'Following' : 'Follow'}
                        </button>
                        {hoveredFriendId === friend.id && hoveredFriendDetails && (
                            <FriendCard friend={hoveredFriendDetails} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

FriendsList.propTypes = {
    userId: PropTypes.number.isRequired
};

export default FriendsList;
