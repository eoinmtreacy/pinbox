import React, { useState } from 'react';
import { useAuthContext } from '../auth/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const CollectionModal = ({ showCollection, setShowCollection }) => {
    const [collectionName, setCollectionName] = useState('');
    const { isAuth } = useAuthContext();
    const { pinbox_id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (collectionName !== '') {
            const normalizedCollection = collectionName.replace(/ /g, '-').toLowerCase();
            navigate(`/${pinbox_id}/${normalizedCollection}`);
        }
        setCollectionName('');
        setShowCollection(false);
    };

    if (!showCollection) return null;

    return (
        <div className="collection-modal w-full h-full fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
                className="relative text-3xl text-gray-500 hover:text-gray-700"
                onClick={() => setShowCollection(!showCollection)}
            >
                X
            </button>
                {isAuth && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Enter Collection Name</h2>
                        <p>Collections let you organise your pins so you can revisit them again or share them with others!</p>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => setShowCollection(!showCollection)}
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
                {!isAuth && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Please Login or Register to Create a Collection</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                                onClick={() => {
                                    setShowCollection(!showCollection);
                                    navigate(`/login`);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => {
                                    setShowCollection(!showCollection);
                                    navigate(`/signup`);
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CollectionModal;