import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './FriendsList.';
import Map from './Map';
import useToggle from '../hooks/useToggle';
import useFetchPlaces from '../hooks/useFetchPlaces';

const MainPage = () => {
    const [showPreference, setShowPreference] = useState(false);
    const [geoJsonData, setGeoJsonData] = useState(null); // Add state for GeoJSON data
    const [timeStamp, setTimeStamp] = useState(12);
    const [distance, setDistance] = useState(50);
    const [showPins, setShowPins] = useState(true);
    const [showFriends, toggleFriends] = useToggle();
    const [mode, setMode] = useState('Day');
    const { places, loading, error } = useFetchPlaces();
    const [pins, setPins] = useState([]);

    const togglePreference = () => {
        setShowPreference(!showPreference);
    };

    useEffect(() => {
        const fetchGeoJsonData = async () => {
            try {
                const response = await fetch('/preference_sample_data.geojson');
                if (!response.ok) {
                    throw new Error('Failed to fetch GeoJSON data');
                }
                const data = await response.json();
                setGeoJsonData(data);
            } catch (error) {
                console.error('Error fetching GeoJSON data:', error);
            }
        };

        fetchGeoJsonData();
    }, []);

    return (
        <div className="flex flex-wrap h-screen">
            <div className="SideNav flex-none w-1/24 ">
                <SideNav
                    onPreferenceToggle={togglePreference}
                    onFriendsToggle={toggleFriends}
                    timeStamp={timeStamp}
                    setTimeStamp={setTimeStamp}
                    distance={distance}
                    setDistance={setDistance}
                    showPins={showPins}
                    setShowPins={setShowPins}
                    mode={mode}
                    setMode={setMode}
                />
            </div>
            {showPreference && places.length > 1 && (
                <div className="flex-none w-4/24">
                    <Preference places={places} pins={pins} setPins={setPins} />{' '}
                    {/* Pass setGeoJsonData to Preference */}
                </div>
            )}
            {showFriends && (
                <div className="w-full md:w-1/4 p-4 bg-white border-r border-gray-300 h-full">
                    <Friends userId={1} />
                </div>
            )}
            <div className={`${showPreference ? 'flex-grow w-17/24' : 'flex-grow w-22/24'}`}>
                <Map geoJsonData={geoJsonData} pins={pins} /> {/* Pass geoJsonData to Map */}
            </div>
        </div>
    );
};

export default MainPage;
