import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import SideNav from './SideNav';
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

    useEffect(() => {
        fetch('nightclub_amenities.geojson')
            .then((response) => response.json())
            .then((data) => setGeoJsonData(data))
            .catch((error) => console.error('Error fetching GeoJSON data:', error));
    }, []);

    return (
        <div className="relative w-full h-full flex">
            <SideNav /> {/* Include SideNav component */}
            <div className="relative w-full h-full flex-grow ml-[70px]"> {/* Add left margin to avoid overlapping with SideNav */}
                <div className="absolute top-10 left-3 z-[1000]">
                    <SearchBar />
                </div>
                <MapContainer center={[40.7478017, -73.9914126]} zoom={13} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {geoJsonData && (
                        <GeoJSON
                            data={geoJsonData}
                            onEachFeature={(feature, layer) => {
                                if (feature.properties?.name) {
                                    layer.bindPopup(`<b>${feature.properties.name}</b><br />${feature.properties.amenity}`);
                                }
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