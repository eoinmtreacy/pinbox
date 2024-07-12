import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFriends } from '../services/friendsService';
import FriendItem from './FriendItem';

const FriendsList = ({ userId }) => {
    const [friends, setFriends] = useState([]);

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Friends List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map(friend => (
                    <FriendItem key={friend.id} friend={friend} />
                ))}
            </div>
        </div>
    );
};

FriendsList.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default FriendsList;