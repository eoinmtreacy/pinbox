import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './FriendsList';
import Map from './Map';
import useToggle from '../hooks/useToggle';
import useFetchPlaces from '../hooks/useFetchPlaces';
import TopNav from './TopNav';
import withHardLightBlend from './withHardLightBlend';
import MobileIcons from './MobileIcons';
import BottomNav from './BottomNav';
import useScreenWidth from '../hooks/useScreenWidth';

const MainPage = () => {
    const [showPreference, setShowPreference] = useState(false);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [timeStamp, setTimeStamp] = useState(12);
    const [distance, setDistance] = useState(50);
    const [showPins, setShowPins] = useState(true);
    const [showFriends, toggleFriends] = useToggle();
    const [mode, setMode] = useState('Day');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('User');
    const { places, loading, error } = useFetchPlaces();
    const [pins, setPins] = useState([]);
    const isMobile = useScreenWidth();

    const togglePreference = () => {
        setShowPreference(!showPreference);
    };

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
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
        <div className="App">
            <div className="flex h-full w-full overflow-hidden">
                {!isMobile && (
                    <div className="SideNav flex-none w-1/24 h-full">
                        <SideNav
                            onPreferenceToggle={togglePreference}
                            onFriendsToggle={toggleFriends}
                        />
                    </div>
                )}
                <div className="flex-grow h-full">
                    <TopNav
                        timeStamp={timeStamp}
                        setTimeStamp={setTimeStamp}
                        distance={distance}
                        setDistance={setDistance}
                        showPins={showPins}
                        setShowPins={setShowPins}
                        mode={mode}
                        setMode={setMode}
                        isLoggedIn={isLoggedIn}
                        onLoginLogout={handleLoginLogout}
                        userName={userName}
                    />
                    <MobileIcons
                        timeStamp={timeStamp}
                        setTimeStamp={setTimeStamp}
                        distance={distance}
                        setDistance={setDistance}
                        showPins={showPins}
                        setShowPins={setShowPins}
                        mode={mode}
                        setMode={setMode}
                        isLoggedIn={isLoggedIn}
                        onLoginLogout={handleLoginLogout}
                    />
                    <div className="flex h-full overflow-hidden">
                        {showPreference && places.length > 1 && (
                            <div className="flex-none w-4/24 h-full overflow-auto">
                                <Preference places={places} pins={pins} setPins={setPins} />
                            </div>
                        )}
                        {showFriends && (
                            <div className="w-full md:w-1/4 p-4 bg-white border-r border-gray-300 h-full overflow-auto">
                                <Friends userId={1} />
                            </div>
                        )}
                        <div className={`${showPreference ? 'flex-grow w-17/24' : 'flex-grow w-22/24'} h-full overflow-auto`}>
                            <Map geoJsonData={geoJsonData} pins={pins} />
                        </div>
                    </div>
                </div>
            </div>
            {isMobile && (
                <BottomNav
                    onPreferenceToggle={togglePreference}
                    onFriendsToggle={toggleFriends}
                />
            )}
        </div>
    );
};

export default withHardLightBlend(MainPage);
