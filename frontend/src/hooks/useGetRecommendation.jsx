import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useGetRecommendation = (placeId) => {
    const [recommendationData, setRecommendationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/Recommendations?placeid=${placeId}`); //passing the placeId to PreferenceWithoutButtons from Map.jsx
                setRecommendationData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [placeId]);

    return { recommendationData, loading, error };
};

export default useGetRecommendation;
