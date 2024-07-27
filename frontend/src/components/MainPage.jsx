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
import CollectionModal from './CollectionModal';

const MainPage = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [timeStamp, setTimeStamp] = useState(0);
    const [timeStampVerbose, setTimeStampVerbose] = useState('');
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

    const [showCollection, setShowCollection] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (pinbox_id === undefined && user !== null) return navigate(`/${user}`);
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
        if (priorityPin != null) {
            if (!pins.map((pin) => pin.id).includes(priorityPin.id)) {
                setShowFeed(true);
            } else {
            }
        }
    }, [priorityPin]);

    useEffect(() => {
        if (showFeed) setShowFriends(false);
        if (showFriends) setShowFeed(false);
        if (isMobile && (showFeed || showFriends)) {
            setShowBusynessTable(false);
        } else {
            setShowBusynessTable(true);
        }
    }, [showFeed, showFriends, isMobile]);

    useEffect(() => {
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();
        const dayOfWeek = weekday[(now.getDay() + day + (now.getHours() + timeStamp > 23 ? 1 : 0)) % 7];
        const hourOfDay = (now.getHours() + timeStamp) % 24;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setTimeStampVerbose(`${dayOfWeek} ${hourOfDay}:${minutes}`);
    }, [timeStamp, day]);

    return (
        <div className="App">
            {showCollection && (
                <CollectionModal showCollection={showCollection} setShowCollection={setShowCollection} />
            )}
            <div className="flex h-full w-full overflow-clip">
                <SideBottomNavbarWrapper
                    showFeed={showFeed}
                    setShowFeed={setShowFeed}
                    showFriends={showFriends}
                    setShowFriends={setShowFriends}
                    isMobile={isMobile}
                    showCollection={showCollection}
                    setShowCollection={setShowCollection}
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
                        timeStampVerbose={timeStampVerbose}
                    />

                    <div className="flex h-full overflow-hidden">
                        {showFeed &&
                            feed.length > 1 &&
                            (user === pinbox_id || (user === null && pinbox_id === undefined)) && (
                                <div
                                    className={`${isMobile ? 'flex-none' : 'flex'} ${
                                        isMobile ? 'w-full' : 'w-1/2'
                                    } flex-col items-center h-full bg-blue-400 p-1`}
                                >
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
                        <div className="w-full h-full overflow-auto">
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
