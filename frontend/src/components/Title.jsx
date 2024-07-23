
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetCollections from '../hooks/useGetCollections';

const Title = () => {
    const { pinbox_id, collection } = useParams();
    const navigate = useNavigate();
    const { collections, collectionsUrls } = useGetCollections(pinbox_id);
    const [selectedCollectionUrl, setSelectedCollectionUrl] = useState('');

    useEffect(() => {
        const currentCollectionUrl = collectionsUrls[collections.indexOf(collection)];
        if (currentCollectionUrl) {
            setSelectedCollectionUrl(currentCollectionUrl);
        }
    }, [collection, collections, collectionsUrls]);

    const handleChange = (event) => {
        const newUrl = event.target.value;
        setSelectedCollectionUrl(newUrl);
        navigate(`/mainpage/${pinbox_id}/${newUrl}`);
    };

    return (
        <div className="flex-grow text-3xl h-12 text-center">
            {pinbox_id ? `${pinbox_id}'s Pinbox / ` : 'Pinbox'}

            {pinbox_id && (
                <select
                    name="collections"
                    id="collections"
                    value={collection}
                    onChange={handleChange}
                >
                    {collections.map((c, i) => (
                        c !== undefined ? (
                            <option key={i} value={collectionsUrls[i]}>{c}</option>
                        ) : (
                            <option key={i} value={""}>ALL PINS</option>
                        )
                    ))}
                </select>

            )}

        </div>
    );
}

export default Title;
