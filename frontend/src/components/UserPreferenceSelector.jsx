import React, { useState, useEffect } from 'react';
import axios from 'axios';
import infernoImage from '.inferno.jpg';
import iceImage from '.ice.png';
const UserPreferenceSelector = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/api/user')
      .then(response => {
        setUsername(response.data.name);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const handlePreferenceChange = (newPreference) => {
    // Send preference to the backend
    axios.post('/api/preference', { preference: newPreference })
      .then(response => {
        console.log('Preference updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the preference!', error);
      });
  };

  return (
    <div className="text-center">
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 inline-block mt-12">
        <h2>Welcome {username}!</h2>
        <p>What's your preference today?</p>
        <div className="flex justify-around mt-6">
          <button 
            className="cursor-pointer text-center p-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" 
            onClick={() => handlePreferenceChange('Inferno')}
          >
            <img src={infernoImage} alt="Inferno (Busy)" className="w-12 h-12 mx-auto" />
            <span>Inferno (Busy)</span>
          </button>
          <button 
            className="cursor-pointer text-center p-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
            onClick={() => handlePreferenceChange('Chill')}
          >
            <img src={iceImage} alt="Chill (Quiet)" className="w-12 h-12 mx-auto" />
            <span>Chill (Quiet)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreferenceSelector;