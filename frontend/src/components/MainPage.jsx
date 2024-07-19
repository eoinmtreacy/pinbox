import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './FriendsList';
import Map from './Map';
import useToggle from '../hooks/useToggle';
import useFetchPlaces from '../hooks/useFetchPlaces';
import TopNav from './TopNav';
import MobileIcons from './MobileIcons';
import BottomNav from './BottomNav';
import useScreenWidth from '../hooks/useScreenWidth';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import { AppContext } from '../Context';

const MainPage = () => {
    const [showPreference, setShowPreference] = useState(false);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [timeStamp, setTimeStamp] = useState(12);
    const [distance, setDistance] = useState(500);
    const [position, setPosition] = useState({ lat: 40.7478017, lng: -73.9914126 });
    const [showPins, setShowPins] = useState(true);
    const [showFriends, toggleFriends] = useToggle();
    const [mode, setMode] = useState('Day');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user } = useAuthContext();
    const { pinbox_id, collection } = useParams();
    const [priorityPin, setPriorityPin] = useState(null);

    // TODO: handle places and pins differently via endpoints
    const { feed, pins, setPins, loading, error } = useFetchPlaces();
    const isMobile = useScreenWidth();
    const [showBusynessTable, setShowBusynessTable] = useState(true);

    const navigate = useNavigate();

    const togglePreference = () => {
        setShowPreference(!showPreference);
    };

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const handleFriendsToggle = () => {
        toggleFriends();
        if (isMobile) {
            setShowBusynessTable(showFriends); // Toggle the busyness table visibility
        }
    };

    useEffect(() => {
        if (pinbox_id === undefined && user !== null) return navigate(`/mainpage/${user}`);
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
    }, [pinbox_id, user, navigate]);

    useEffect(() => {
        if (priorityPin != null)
            setShowPreference(true)
    }, [priorityPin])

    return (
        <AppContext.Provider value={[priorityPin, setPriorityPin]}>
            {/* wrapping this with context for the search bar/ recommender system */}
            <div className="App">
                <div className="flex h-full w-full overflow-hidden">
                    {!isMobile && (
                        <div className="SideNav flex-none w-1/24 h-full">
                            <SideNav
                                onPreferenceToggle={togglePreference}
                                onFriendsToggle={handleFriendsToggle}
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
                            {showPreference && feed.length > 1 && (user === pinbox_id || (user === null && pinbox_id === undefined)) && (
                                <div className="flex-none w-4/24 h-full overflow-auto">
                                    <Preference 
                                        feed={feed} 
                                        pins={pins} 
                                        setPins={setPins} 
                                        position={position} 
                                        distance={distance}
                                    />
                                </div>
                            )}
                            {showFriends && (
                                <div className="w-full md:w-1/4 p-4 bg-white border-r border-gray-300 h-full overflow-auto">
                                    <Friends userId={1} />
                                </div>
                            )}
                            <div className={`${showPreference ? 'flex-grow w-17/24' : 'flex-grow w-22/24'} h-full overflow-auto`}>
                                <Map 
                                    geoJsonData={geoJsonData} 
                                    pins={pins} 
                                    showBusynessTable={showBusynessTable} 
                                    distance={distance}
                                    position={position}
                                    setPosition={setPosition}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {isMobile && (
                    <BottomNav
                        onPreferenceToggle={togglePreference}
                        onFriendsToggle={handleFriendsToggle}
                    />
                )}
            </div>
        </AppContext.Provider>
    );
};

export default MainPage;
