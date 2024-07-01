import React, { useState } from 'react';
import SideNav from './SideNav';
import Preference from './Preference';
import Map from './Map';

const Main = () => {
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
                    <Preference setGeoJsonData={setGeoJsonData} /> {/* Pass setGeoJsonData to Preference */}
                </div>
            )}
            <div className={`${showPreference ? 'flex-grow w-19/24' : 'flex-grow w-23/24'}`}>
                <Map geoJsonData={geoJsonData} /> {/* Pass geoJsonData to Map */}
            </div>
        </div>
    );
};

export default Main;
