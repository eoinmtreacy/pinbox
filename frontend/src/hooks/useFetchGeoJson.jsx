import { useState, useEffect } from 'react';

const useFetchGeoJson = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const manhattan = data.features.filter((feature) => feature.properties.borough === 'Manhattan');
                setData(manhattan);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, error, loading };
};

export default useFetchGeoJson;
