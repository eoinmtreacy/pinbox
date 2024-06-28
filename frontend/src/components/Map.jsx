import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

const getColorForPreference = (preference) => {
    switch (preference) {
        case 'hate it':
            return 'red';
        case "don't care":
            return 'pink';
        case 'interested':
            return 'blue';
        case 'love it':
            return 'green';
        default:
            return 'black';
    }
};

const CustomMap = ({ onPreferenceToggle, setMapInstance }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [showFriends, setShowFriends] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && mapRef.current.leafletElement) {
            setMapInstance(mapRef.current.leafletElement);
        }
    }, [setMapInstance]);

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
                    <MapContainer
                        center={[40.7478017, -73.9914126]}
                        zoom={8}
                        className="h-full w-full"
                        id="map"
                        ref={mapRef}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <GetUserLocation />
                        {geoJsonData &&
                            geoJsonData.features.map((feature, idx) => {
                                const { coordinates } = feature.geometry;
                                const { preference, name } = feature.properties;
                                const color = getColorForPreference(preference);

                                const icon = L.divIcon({
                                    className: 'custom-icon',
                                    html: `<i class="fa fa-map-marker" style="color:${color}; font-size: 24px;"></i>`,
                                });

                                return (
                                    <Marker key={idx} position={[coordinates[1], coordinates[0]]} icon={icon}>
                                        <Popup>
                                            <b>{name}</b>
                                            <br />
                                            {preference}
                                        </Popup>
                                    </Marker>
                                );
                            })}
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
