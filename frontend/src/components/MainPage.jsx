import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Preference from './Preference';
import Map from './Map';

const MainPage = () => {
    const [showPreference, setShowPreference] = useState(false);
    const [geoJsonData, setGeoJsonData] = useState(null); // Add state for GeoJSON data
    const [timeStamp, setTimeStamp] = useState(12);
    const [distance, setDistance] = useState(50);
    const [showPins, setShowPins] = useState(true);
    const [mode, setMode] = useState('Day');

    const togglePreference = () => {
        setShowPreference(!showPreference);
    };

    const toggleFriends = () => {
        console.log('Friends toggle function');
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
        <div className="flex h-screen">
            <div className="flex-none w-1/24 ">
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
            {showPreference && (
                <div className="flex-none w-4/24">
                    <Preference setGeoJsonData={setGeoJsonData} geoJsonData={geoJsonData} />{' '}
                    {/* Pass setGeoJsonData to Preference */}
                </div>
            )}
            <div className={`${showPreference ? 'flex-grow w-19/24' : 'flex-grow w-23/24'}`}>
                <Map geoJsonData={geoJsonData} /> {/* Pass geoJsonData to Map */}
            </div>
        </div>
    );
};

export default MainPage;
