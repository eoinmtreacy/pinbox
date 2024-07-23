import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { getUserData } from '../services/tempProfileService';
import useFetchPlaces from '../hooks/useFetchPlaces'
import useGetCollections from '../hooks/useGetCollections';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const { pinbox_id } = useParams();
    const { pins } = useFetchPlaces();
    const [searchTerm, setSearchTerm] = useState('');
    const { collections, collectionsUrls } = useGetCollections(pinbox_id);
    const [showAll, setShowAll] = useState(false); // Define showAll state


    const filteredPins = pins.filter(pin => {
        // Trim and lowercase the search term once
        const trimmedSearchTerm = searchTerm.trim().toLowerCase();

        // Return all pins if the search term is empty
        if (trimmedSearchTerm === '') return true;

        // Check various conditions
        const matchesName = pin.place.name.toLowerCase().includes(trimmedSearchTerm);
        const matchesSubtype = pin.place.subtype.toLowerCase().includes(trimmedSearchTerm);
        // Add more conditions as needed

        return matchesName || matchesSubtype;
    });

    useEffect(() => {
        getUserData()
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4 flex-grow"> {/* Add left margin for sidebar */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-4xl flex-grow">
                <div className="flex items-center mb-4">
                    <img src={userData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mr-4" />
                    <div>
                        <h1 className="text-3xl font-bold">{pinbox_id}</h1>
                        <p className="text-gray-600">@{pinbox_id}</p>
                    </div>
                    <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
                </div>
                <div className="mb-4">
                    <p>{userData.bio}</p>
                </div>
                <div className="flex mb-4">
                    <div className="mr-8">
                        <h2 className="text-xl font-bold">{userData.maps.length}</h2>
                        <p className="text-gray-600">Maps</p>
                    </div>
                    <div className="mr-8">
                        <h2 className="text-xl font-bold">{userData.followers}</h2>
                        <p className="text-gray-600">Followers</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{userData.following}</h2>
                        <p className="text-gray-600">Following</p>
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded w-full"
                        placeholder="Search for a specific place, or restaurants or coffee shops..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* pinned places grid */}
                <h2 className="text-2xl font-bold mb-4">Places I Love! &#10084; </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredPins.map((pin, index) => {
                        if (showAll || index < 9) { // Show all if 'showAll' is true, otherwise limit to first 9
                            return (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="font-bold text-lg mb-2">{pin.place.name}</h3>
                                    <img src={"/" + pin.place.photo_0 + ".png"} alt={pin.place.name} className="w-full h-48 object-cover rounded" />
                                </div>
                            );
                        }
                        return null; // Skip rendering if index >= 9 and 'showAll' is false
                    })}
                </div>

                {filteredPins.length > 9 && (
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {collections.length > 0 && collectionsUrls.length > 0 && collections.map((collection, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-bold text-lg mb-2">{collection}</h3>
                            <a href={`/mainpage/${pinbox_id}/${collectionsUrls[index]}`} className="text-blue-500 hover:text-blue-700">
                                {collection}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
