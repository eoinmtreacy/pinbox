import React from 'react';
import PropTypes from 'prop-types';

const FriendCard = ({ friend }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg absolute z-10 w-64">
            <h3 className="text-lg font-bold">{friend.name}</h3>
            <p className="text-sm">{friend.position}</p>
            <p className="text-sm">✉️ {friend.email}</p>
            <p className="text-sm">📞 {friend.phone}</p>
            <p className="text-sm">{friend.address}</p>
            <p className="text-sm">{friend.city}</p>
        </div>
    );
};

FriendCard.propTypes = {
    friend: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
    }).isRequired,
};

export default FriendCard;
