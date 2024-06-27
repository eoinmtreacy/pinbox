import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import Friends from './Friends';
import TopNav from './TopNav';
import HorizontalButtons from './HorizontalButtons';
import SideNav from './SideNav';
import '../App.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = ({ onPreferenceToggle }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [showFriends, setShowFriends] = useState(false);

    useEffect(() => {
        fetch('nightclub_amenities.geojson')
            .then((response) => response.json())
            .then((data) => setGeoJsonData(data))
            .catch((error) => console.error('Error fetching GeoJSON data:', error));
    }, []);

    const handleFriendsToggle = () => {
        setShowFriends((prev) => !prev);
    };

    return (
        <div className="relative flex flex-col h-screen">
            <TopNav />
            <div className="flex flex-grow mt-16">
                <SideNav onPreferenceToggle={onPreferenceToggle} onFriendsToggle={handleFriendsToggle} />
                {showFriends && (
                    <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full">
                        <Friends userId={1} />
                    </div>
                )}
                <div className={`relative h-full flex-grow ${showFriends ? 'w-3/4' : 'w-full'}`}>
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
