import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { filterForPhotos } from '../utils/filter';

export default function useFetchPlaces() {
    const { pinbox_id } = useParams();
    const [feed, setFeed] = useState([]);
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFeedAndPins = async () => {
            try {
                const response = await axios.get(`/api/app/feed-and-pins/${pinbox_id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch feed and pins');
                }
                setFeed(await filterForPhotos(response.data.feed.$values))
                setPins(response.data.pins.$values)
            } catch (error) {
                console.error('Error fetching feed and pins:', error);
                setError(error);
            }
            setLoading(false);
        }
        getFeedAndPins();
        // if there's no user logged in, just get the feed 
    }, []);

    return { feed, pins, setPins, loading, error }
}