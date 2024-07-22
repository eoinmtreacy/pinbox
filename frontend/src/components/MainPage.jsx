import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './FriendsList';
import Map from './Map';
import useToggle from '../hooks/useToggle';
import useFetchPlaces from '../hooks/useFetchPlaces';
import BottomNav from './BottomNav';
import useScreenWidth from '../hooks/useScreenWidth';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import NavbarWrapper from './navbar/NavbarWrapper';

const MainPage = () => {
    const [showPreference, setShowPreference] = useState(false);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [timeStamp, setTimeStamp] = useState(0);
    const [distance, setDistance] = useState(500);
    const [position, setPosition] = useState({ lat: 40.7478017, lng: -73.9914126 });
    const [showPins, setShowPins] = useState(true);
    const [showFriends, toggleFriends] = useToggle();
    const [day, setDay] = useState(0);
    const { user } = useAuthContext();
    const { pinbox_id, collection } = useParams();
    const [priorityPin, setPriorityPin] = useState(null);

    const { feed, pins, setPins, loading, error } = useFetchPlaces();
    const isMobile = useScreenWidth();
    const [showBusynessTable, setShowBusynessTable] = useState(true);

    const navigate = useNavigate();

    const togglePreference = () => {
        setShowPreference(!showPreference);
    };

    const handleFriendsToggle = () => {
        toggleFriends();
        if (isMobile) {
            setShowBusynessTable(showFriends);
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
        <div className="App">
            <div className="flex h-full w-full overflow-clip">
                {!isMobile && (
                    <div className="SideNav flex-none w-1/24 h-full">
                        <SideNav
                            onPreferenceToggle={togglePreference}
                            onFriendsToggle={handleFriendsToggle}
                        />
                    </div>
                )}
                <div className="flex-grow h-full">
                    <NavbarWrapper
                        isMobile={isMobile}
                        priorityPin={priorityPin}
                        setPriorityPin={setPriorityPin}
                        timeStamp={timeStamp}
                        setTimeStamp={setTimeStamp}
                        distance={distance}
                        setDistance={setDistance}
                        showPins={showPins}
                        setShowPins={setShowPins}
                        day={day}
                        setDay={setDay}
                    />
                    <div className="flex h-full overflow-hidden">
                        {showPreference && feed.length > 1 && (user === pinbox_id || (user === null && pinbox_id === undefined)) && (
                            <div className="flex-none w-4/24 h-full overflow-">
                                <Preference 
                                    feed={feed} 
                                    pins={pins} 
                                    setPins={setPins} 
                                    position={position} 
                                    distance={distance}
                                    priorityPin={priorityPin}
                                    setPriorityPin={setPriorityPin}
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
                                timeStamp={timeStamp}
                                priorityPin={priorityPin}
                                setPriorityPin={setPriorityPin}
                                showPreference={showPreference}
                                showFriends={showFriends}
                                isMobile={isMobile}
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
    );
};

export default MainPage;