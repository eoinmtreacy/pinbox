import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const useGetCollections = () => {
    const { pinbox_id } = useParams();
    const [ collections, setCollections ] = useState([]);
    const [ collectionsUrls, setCollectionsUrls ] = useState([]);

    useEffect(() => {
        const getCollections = async () => {
            try {
                const response = await axios.get(`/api/app/get-collections/${pinbox_id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch collections');
                }
                
                setCollections(response.data.$values.map(c => c.normalizedCollection));
                setCollectionsUrls(response.data.$values.map(c => c.collection));

            } catch (error) {
                console.error('Error fetching feed and pins:', error);
            }
        }
        getCollections();
    }, []);

    return { collections, collectionsUrls }
}

export default useGetCollections;