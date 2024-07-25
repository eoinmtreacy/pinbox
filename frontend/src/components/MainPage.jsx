import React, { useState, useEffect } from 'react';
import Preference from './Preference';
import Friends from './FriendsList';
import Map from './Map';
import useFetchPlaces from '../hooks/useFetchPlaces';
import useScreenWidth from '../hooks/useScreenWidth';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import NavbarWrapper from './navbar/NavbarWrapper';
import Title from './Title';
import SideBottomNavbarWrapper from './side-bottom_navbar/SideBottomNavbarWrapper';

const MainPage = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [timeStamp, setTimeStamp] = useState(0);
    const [distance, setDistance] = useState(500);
    const [position, setPosition] = useState({ lat: 40.7478017, lng: -73.9914126 });
    const [showPins, setShowPins] = useState(true);
    const [day, setDay] = useState(0);

    const [showFeed, setShowFeed] = useState(false);
    const [showFriends, setShowFriends] = useState(false);

    const { user } = useAuthContext();
    const { pinbox_id, collection } = useParams();
    const [priorityPin, setPriorityPin] = useState(null);

    const { feed, pins, setPins, loading, error } = useFetchPlaces();
    const isMobile = useScreenWidth();
    const [showBusynessTable, setShowBusynessTable] = useState(true);

    const navigate = useNavigate();

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
            setShowFeed(true);
    }, [priorityPin]);

    return (
        <div className="App">
            <div className="flex h-full w-full overflow-clip">
                <SideBottomNavbarWrapper 
                    showFeed={showFeed}
                    setShowFeed={setShowFeed}
                    showFriends={showFriends}
                    setShowFriends={setShowFriends}
                    isMobile={isMobile}
                    />
                <div className="flex-grow h-full">
                    <Title />
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
                        {showFeed && feed.length > 1 && (user === pinbox_id || (user === null && pinbox_id === undefined)) && (
                            <div className={`flex-none ${isMobile ? 'w-3/4 max-h-1/4' : 'w-4/24'}`}>
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
                        <div className={`${showFeed ? (isMobile ? 'flex-grow w-3/4' : 'flex-grow w-17/24') : 'flex-grow w-22/24'} h-full overflow-auto`}>
                            <Map 
                                geoJsonData={geoJsonData} 
                                pins={pins} 
                                showPins={showPins}
                                showBusynessTable={showBusynessTable} 
                                distance={distance}
                                position={position}
                                setPosition={setPosition}
                                timeStamp={timeStamp}
                                day={day}
                                priorityPin={priorityPin}
                                setPriorityPin={setPriorityPin}
                                showFeed={showFeed}
                                showFriends={showFriends}
                                isMobile={isMobile}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MainPage;
