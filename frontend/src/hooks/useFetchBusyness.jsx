import { useState, useEffect } from 'react';
import axios from '../api/axios';

function useFetchBusyness(day) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("use effect triggered with", day);
        setLoading(true);
        const getPredictions = async () => {
            try {
                const response = await axios.get(`/api/app/get-predictions/${day}`)
                if (response.status !== 200) {
                    throw new Error('Failed to fetch busyness predictions');
                }

                const hours = response.data.$values
                const busynessTable = [];
                console.log(hours);

                hours.forEach((hour) => {
                    const zoneHourPrediction = {};
                    const uniqueLocations = new Set();
                    const zones = hour.predictionsByLocation.$values;
                    // map zones to an object with key zone.location and value zone.prediction.percentile
                    zones.forEach((zone) => {
                        if (zone.prediction.percentile !== undefined && !uniqueLocations.has(zone.location)) {
                            zoneHourPrediction[zone.location] = zone.prediction.percentile;
                            uniqueLocations.add(zone.location);
                        }
                    }
                    );

                    busynessTable.push(zoneHourPrediction);
                });


                setData(busynessTable);

            } catch (error) {
                setError(error);
            }

            finally {

                setLoading(false);
            }
        }

        getPredictions();


    }, [day]);

    return { data, error, loading };
}

export default useFetchBusyness
