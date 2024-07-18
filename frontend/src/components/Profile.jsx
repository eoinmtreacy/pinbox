import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { getUserData } from '../services/tempProfileService'; // Updated import

const Profile = () => {
    const [userData, setUserData] = useState(null);

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
                        <h1 className="text-3xl font-bold">{userData.name}</h1>
                        <p className="text-gray-600">@{userData.username}</p>
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
                    <input type="text" className="p-2 border border-gray-300 rounded w-full" placeholder="Search for your custom pinboxes..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.maps.map((map, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-bold text-lg mb-2">{map.name}</h3>
                            <img src={map.image} alt={map.name} className="w-full h-48 object-cover rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
