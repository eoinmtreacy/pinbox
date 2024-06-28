import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './Friends';
import useFetchGeoJson from '../hooks/useFetchGeoJson';
import useToggle from '../hooks/useToggle';
import '../App.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = () => {
    const { data: taxiZones, error } = useFetchGeoJson('taxi_zones.geojson');
    const [showPreference, togglePreference] = useToggle();
    const [showFriends, toggleFriends] = useToggle();

    if (error) return <div>Error fetching Taxi Zones data: {error.message}</div>;

    return (
        <div className="relative w-full h-full flex">
            <SideNav onPreferenceToggle={togglePreference} onFriendsToggle={toggleFriends} />
            {showPreference && (
                <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full ml-[70px]">
                    <Preference />
                </div>
            )}
            {showFriends && (
                <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full ml-[70px]">
                    <Friends userId={1} />
                </div>
            )}
            <div className={`relative h-full flex-grow ${showPreference || showFriends ? 'w-3/4' : 'w-full'} ml-[70px]`}>
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
                                return {
                                    color: `rgb(${seed * 256}, 0, ${(1 - seed) * 256})`,
                                    weight: 1,
                                    opacity: 0.3,
                                    fillOpacity: 0.5,
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
