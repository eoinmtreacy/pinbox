import { useState, useEffect } from 'react';
import { filterForPhotos } from '../utils/filter';

export default function useFetchPlaces() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8000/api/app/get-places")
            .then((response) => response.json())
            .then(async (data) => {
                console.log(Object.values(data)[1]);
                const filteredPlaces = await filterForPhotos(Object.values(data)[1])
                setPlaces(filteredPlaces);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError(error);
                setLoading(false);
            });
    }, []);

    return { places, loading, error } 
}