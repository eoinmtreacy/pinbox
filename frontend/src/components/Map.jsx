import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import SideNav from './SideNav';
import Preference from './Preference'; // Import the Preference component
import Friends from './Friends'; // Import the Friends component
import '../App.css';

// Update Leaflet icon paths to resolve missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = () => {
    // const [geoJsonData, setGeoJsonData] = useState(null);
    const [taxiZones, setTaxiZones] = useState(null)
    const [showPreference, setShowPreference] = useState(false);
    const [showFriends, setShowFriends] = useState(false);

    useEffect(() => {
        // fetch('nightclub_amenities.geojson')
        //     .then((response) => response.json())
        //     .then((data) => setGeoJsonData(data))
        //     .catch((error) => console.error('Error fetching GeoJSON data:', error));

        fetch('taxi_zones.geojson')
            .then((response) => response.json())
            .then((data) => { setTaxiZones(data) })
            .catch((error) => console.error('Error fetching Taxi Zones data:', error));
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
        <div className="relative w-full h-full flex">
            <SideNav onPreferenceToggle={handlePreferenceToggle} onFriendsToggle={handleFriendsToggle} /> {/* Include SideNav component */}
            {showPreference && (
                <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full ml-[70px]">
                    <Preference /> {/* Use the imported Preference component */}
                </div>
            )}
            {showFriends && (
                <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full ml-[70px]">
                    <Friends userId={1} /> {/* Use the imported Friends component */}
                </div>
            )}
            <div className={`relative h-full flex-grow ${showPreference || showFriends ? 'w-3/4' : 'w-full'} ml-[70px]`}>
                {' '}
                {/* Adjust width based on preference or friends panel */}
                <div className="absolute top-10 left-3 z-[1000] flex">
                    <SearchBar />
                </div>
                <MapContainer center={[40.7478017, -73.9914126]} zoom={13} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {taxiZones && (
                        <GeoJSON
                            data={taxiZones}
                            style={(feature) => {
                                const seed = Math.random();
                                // in future, we will look up each zone's ID
                                // and reference iet against the the database prediction
                                    // e.g. color: predictions[feature.properties.LocationID]
                                return {
                                    color: `rgb(${seed * 256}, 0, ${(1 - seed) * 256})`,
                                    weight: 1,
                                    opacity: 0.3,
                                    fillOpacity: 0.5
                                };
                            }}
                        />
                    )}

                    <GetUserLocation />
                    <div className="absolute bottom-[0.5vh] z-[1000]">
                        <CookieModal />
                    </div>
                </MapContainer>
            </div>
        </div>
    );
};

export default CustomMap;