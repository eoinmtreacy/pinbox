
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetCollections from '../hooks/useGetCollections';

const Title = () => {
    const { pinbox_id, collection } = useParams();
    const navigate = useNavigate();
    const { collections, collectionsUrls } = useGetCollections(pinbox_id);

    return (
        <div className="text-3xl text-center ap-2">
            {pinbox_id ? `${pinbox_id}'s Pinbox / ` : 'Pinbox'}

            {pinbox_id && (
                <select
                    name="collections"
                    id="collections"
                    value={collection}
                    onChange={(e) => navigate(`/${pinbox_id}/${e.target.value}`)}
                    className="truncate max-w-xs"
                >
                    <option value={collection}>{collection ? collection : "ALL PINS"}</option>
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
