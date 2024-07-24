import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import axios from '../api/axios';
import { getUserData } from '../services/tempProfileService';
import useFetchPlaces from '../hooks/useFetchPlaces';
import useGetCollections from '../hooks/useGetCollections';
//import profilePicture from '../friends/userProfilePictures/userProfileImage.png';

// List of avatars
const predefinedProfileImages = [
    'content.jpeg',
    'cool.jpeg',
    'csharpdeveloper.jpeg',
    'retiredcsharpdeveloper.jpeg',
    'marvel.jpeg',
    'surprised.jpeg',
    'sad.jpeg',
    'userProfilePhoto.png',
    'lostit.jpeg'
];

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const { pinbox_id } = useParams();
    const { pins } = useFetchPlaces();
    const [searchTerm, setSearchTerm] = useState('');
    const { collections, collectionsUrls } = useGetCollections();
    const [showAll, setShowAll] = useState(false); // Define showAll state
    const [isEditing, setIsEditing] = useState(false); // Define isEditing state
    const [bio, setBio] = useState(''); // Define bio state
    const [profileImageUrl, setProfileImageUrl] = useState(''); // Define profileImageUrl state

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
        getUserData(pinbox_id) // Passing the userId to get user profile data
            .then(data => {
                setUserData(data.data);
                setBio(data.data.bio);
                setProfileImageUrl(data.data.profileImageUrl);
            })
            .catch(error => {
                setBio("Nothing to see here...");
                setUserData({
                    bio: "Nothing to see here..."
                })
                console.error('Error fetching user data:', error)
            });
    }, [pinbox_id]);

    const handleEditProfile = async () => {
        try {
            const response = await axios.post(`/user/user-profile/${pinbox_id}`,  {
                userId: pinbox_id,
                bio: bio,
                profileImageUrl: profileImageUrl
            },
            { withCredentials: true }
        );

            if (response.status !== 200) {
                throw new Error('Failed to update profile');
            }

            setUserData({ ...userData, bio, profileImageUrl });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    //handling image selection
    const handleImageSelect = (image) => {
        setProfileImageUrl(image);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4 flex-grow">
            <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-4xl flex-grow">
                <div className="flex items-center mb-4">
                <img src={`/${profileImageUrl || 'userProfilePhoto.png'}`} alt="Profile" className="w-32 h-32 rounded-full mr-4" />
                <div>
                        <h1 className="text-3xl font-bold">{pinbox_id}</h1>
                        <p className="text-gray-600">@{pinbox_id}</p>
                    </div>
                    <button
                        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
                {isEditing ? (
                    <div className="mb-4">
                        <textarea
                            className="p-2 border border-gray-300 rounded w-full mb-2"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Update your bio"
                        />
                        <div className="mb-2">
                            <p>Select a profile image:</p>
                            <div className="flex space-x-2">
                                {predefinedProfileImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`/${image}`}
                                        alt={`Profile option ${index + 1}`}
                                        className={`w-16 h-16 rounded-full cursor-pointer ${profileImageUrl === image ? 'border-4 border-blue-500' : 'border-2 border-gray-300'}`}
                                        onClick={() => handleImageSelect(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleEditProfile}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="mb-4">
                        <p>{userData.bio}</p>
                    </div>
                )}
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

