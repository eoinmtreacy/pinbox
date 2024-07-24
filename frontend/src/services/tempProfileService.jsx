// src/services/tempProfileService.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

export const getUserData = (pinbox_id) => {
    return axios.get(`/User/user-profile/${pinbox_id}`);
};
