import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './Friends';
import HorizontalButtons from './HorizontalButtons';
import '../App.css';

// Update Leaflet icon paths to resolve missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [showPreference, setShowPreference] = useState(false);
    const [showFriends, setShowFriends] = useState(false);

    // State for former TopNav components
    const [timeStamp, setTimeStamp] = useState(12);
    const [distance, setDistance] = useState(50);
    const [showPins, setShowPins] = useState(true);
    const [mode, setMode] = useState('Day');

    useEffect(() => {
        fetch('nightclub_amenities.geojson')
            .then((response) => response.json())
            .then((data) => setGeoJsonData(data))
            .catch((error) => console.error('Error fetching GeoJSON data:', error));
    }, []);

    const handlePreferenceToggle = () => {
        setShowPreference((prev) => !prev);
        if (showFriends) setShowFriends(false); // Ensure only one panel is open at a time
    };

    const handleFriendsToggle = () => {
        setShowFriends((prev) => !prev);
        if (showPreference) setShowPreference(false); // Ensure only one panel is open at a time
    };

    return (
        <div className="relative flex flex-col h-screen">
            <div className="flex flex-grow">
                <SideNav
                    onPreferenceToggle={handlePreferenceToggle}
                    onFriendsToggle={handleFriendsToggle}
                    timeStamp={timeStamp}
                    setTimeStamp={setTimeStamp}
                    distance={distance}
                    setDistance={setDistance}
                    showPins={showPins}
                    setShowPins={setShowPins}
                    mode={mode}
                    setMode={setMode}
                />
                {showPreference && (
                    <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full">
                        <Preference />
                    </div>
                )}
                {showFriends && (
                    <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full">
                        <Friends userId={1} />
                    </div>
                )}
                <div className={`relative h-full flex-grow ${showPreference || showFriends ? 'w-3/4' : 'w-full'}`}>
                    <div className="absolute top-1 left-16 right-0 z-[1000] flex space-y-4">
                        <SearchBar />
                        <HorizontalButtons />
                    </div>
                    <MapContainer center={[40.7478017, -73.9914126]} zoom={13} className="h-full w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {geoJsonData && (
                            <GeoJSON
                                data={geoJsonData}
                                onEachFeature={(feature, layer) => {
                                    if (feature.properties?.name) {
                                        layer.bindPopup(
                                            `<b>${feature.properties.name}</b><br />${feature.properties.amenity}`
                                        );
                                    }
                                }}
                            />
                        )}
                        <GetUserLocation />
                        <div className="absolute bottom-2 z-50">
                            <CookieModal />
                        </div>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default CustomMap;
