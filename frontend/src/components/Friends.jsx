import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Friends = ({ userId }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`/api/friends/${userId}`);
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [userId]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Friends List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map(friend => (
                    <div key={friend.id} className="p-4 border rounded-lg flex flex-col items-center">
                        <img 
                            src={friend.photoUrl} 
                            alt={`${friend.name}`} 
                            className="w-24 h-24 rounded-full mb-4" 
                        />
                        <h3 className="text-xl font-semibold">{friend.name}</h3>
                        <p className="text-gray-600">{friend.location}</p>
                        <p className="text-gray-500">{friend.distance} miles away</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Follow</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Define prop types
Friends.propTypes = {
    userId: PropTypes.number.isRequired
};

export default Friends;