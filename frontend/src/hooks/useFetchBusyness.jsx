import { useState, useEffect } from 'react';

function useFetchBusyness(endpoint, avgPassengerCountEndpoint) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let busynessTable = {}; // Define outside to be accessible in all then blocks

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Initialize busynessTable with the first fetch results
                data.forEach((prediction) => {
                    busynessTable[prediction.location] = prediction.passenger_count;
                });
                // Return a promise for the next fetch operation
                return fetch(avgPassengerCountEndpoint);
            })
            .then((response) => response.json())
            .then((avgData) => {
                // Update busynessTable with data from the second fetch
                Object.keys(busynessTable).forEach((key) => {
                    if (avgData[key] && avgData[key] !== 0) {
                        // Check to avoid division by zero
                        busynessTable[key] = busynessTable[key] / avgData[key];
                    } else {
                        busynessTable[key] = null; // Handle division by zero or undefined avgData[key]
                    }
                });
                setData(busynessTable);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false); // Ensure loading is set to false in both success and error cases
            });
    }, [endpoint, avgPassengerCountEndpoint]); // Use correct dependency variables

    return { data, error, loading };
}

export default useFetchBusyness;
