import axios from 'axios';

const API_URL = 'http://your-api-url/api'; // Replace with your actual API URL

export const getFriends = async (userId) => {
    const response = await axios.get(`${API_URL}/friends/${userId}`);
    return response.data;
};

export const getFriendDetails = async (id) => {
    const response = await axios.get(`${API_URL}/friend-details/${id}`);
    return response.data;
};
