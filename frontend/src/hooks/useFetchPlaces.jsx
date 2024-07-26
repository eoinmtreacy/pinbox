import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function useFetchPlaces() {
    const { pinbox_id, collection } = useParams();
    const [feed, setFeed] = useState([]);
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFeedAndPins = async () => {
            try {
                const response = await axios.get(`/api/app/feed-and-pins/${pinbox_id}/${collection}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch feed and pins');
                }
                const filteredFeed = response.data.feed.$values
                const pinsData = response.data.pins.$values;
                setFeed(filteredFeed);
                setPins(pinsData);
            } catch (error) {
                console.error('Error fetching feed and pins:', error);
                setError(error);
            }
            setLoading(false);
        }
        getFeedAndPins();
    }, [pinbox_id, collection]);

    return { feed, pins, setPins, loading, error }
}