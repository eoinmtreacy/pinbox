import { useState, useEffect } from 'react';
import axios from '../api/axios';

function useFetchBusyness(day) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let busynessTable = []; // Define outside to be accessible in all then blocks

        const getPredictions = async () => {
            try {
                const response = await axios.get(`http://localhost:80/backend/api/app/get-predictions/${day}`)
                if (response.status !== 200) {
                    throw new Error('Failed to fetch busyness predictions');
                }

            const hours = response.data.$values

            hours.map((hour) => {
                const zoneHourPrediction = {}
                const zones = hour.predictionsByLocation.$values
                zones.map((zone) => {
                    zoneHourPrediction[zone.location] = zone.prediction.percentile;
                })
                busynessTable.push(zoneHourPrediction)
            })

            setData(busynessTable);

            } catch (error) {
                setError(error);
            }

            setLoading(false);
        }

       getPredictions();

    }, [day]);

    return { data, error, loading };
}

export default useFetchBusyness
