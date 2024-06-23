import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import prop-types

const UserProfileBox = ({ isClickable }) => {
  const [user, setUser] = useState({ name: '', profile_picture: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's data from the backend

    axios.get('/api/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(async error => {
        console.error('There was an error fetching the user data!', await error);
    });
  }, []);

  // Format the user's name into the desired format
  const formatName = (name) => {
    const firstName = name.split(' ')[0];
    return `${firstName}'s Pinbox`;
  };

  // Handle click to navigate to the user's profile page
  const handleClick = () => {
    if (isClickable) {
      navigate('/user/profile'); // Adjust the path according to your routing setup
    }
  };

  return (
    <button
      className={`flex items-center bg-blue-500 text-white p-4 rounded-lg ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? handleClick : undefined}
      aria-label={isClickable ? `Navigate to ${user.name}'s profile` : undefined}
    >
      <span className="text-xl font-bold mr-4">{formatName(user.name)}</span>
      {user.profile_picture && (
        <img src={user.profile_picture} alt="User" className="w-10 h-10 rounded-full" />
      )}
    </button>
  );
};

// Define prop types
UserProfileBox.propTypes = {
  isClickable: PropTypes.bool.isRequired, // Ensure isClickable is a boolean and required
};

export default UserProfileBox;