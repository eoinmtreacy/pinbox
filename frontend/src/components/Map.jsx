import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from './Header';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import '../App.css';

// Custom Zoom Control Component
const CustomZoomControl = () => {
    const map = useMap();

    // Remove the default zoom control
    useEffect(() => {
        map.zoomControl.remove();
    }, [map]);

    return null;
};

// Update Leaflet icon paths to resolve missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        // Fetch GeoJSON data
        fetch('nightclub_amenities.geojson') // Ensure the file is in the public directory
            .then((response) => response.json())
            .then((data) => {
                console.log('GeoJSON data fetched:', data); // Debugging log
                setGeoJsonData(data);
            })
            .catch((error) => {
                console.error('Error fetching GeoJSON data:', error); // Debugging log
            });
    }, []);

    return (
        <div className="relative w-full h-full md:w-[42vh] md:h-[100vh]">
            {/* Fixed header at the top */}
            <div className="absolute top-3 left-0 right-0 z-[1000]">
                <Header />
            </div>

            {/* Fixed search bar below the header */}
            <div className="absolute top-16 left-0 right-0 z-[1000]">
                <SearchBar />
            </div>

            {/* Sidebar, positioned responsively */}
            <div className="absolute top-[150px] left-0 md:left-[35vh] right-0 z-[1000]">
                <Sidebar />
            </div>

            {/* Map container with responsive styling */}
            <MapContainer center={[40.7478017, -73.9914126]} zoom={13} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {geoJsonData && (
                    <GeoJSON
                        data={geoJsonData}
                        onEachFeature={(feature, layer) => {
                            if (feature.properties && feature.properties.name) {
                                layer.bindPopup(`<b>${feature.properties.name}</b><br />${feature.properties.amenity}`);
                            }
                        }}
                    />
                )}
                <GetUserLocation />
                <CustomZoomControl />
                {/* Fixed position for the cookie modal */}
                <div className="absolute bottom-[0.5vh] z-[1000]">
                    <CookieModal />
                </div>
            </MapContainer>
        </div>
    );
};

export default Map;