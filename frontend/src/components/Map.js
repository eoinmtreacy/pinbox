import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import Header from './Header';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

const CustomZoomControl = () => {
    const map = useMap();

    React.useEffect(() => {
        map.zoomControl.remove();
        new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
    }, [map]);

    return null;
};
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
        <div className="relative z-10" style={{ height: '100vh', padding: '10px' }}>
            <div className="absolute top-3 left-0 right-0 z-[1000]">
                <Header />
            </div>

            <div className="absolute top-16 left-0 right-0 z-[1000]">
                <SearchBar />
            </div>

            <div className="absolute top-[150px] left-[35vh] right-0 z-[1000]">
                <Sidebar />
            </div>
            <MapContainer center={[40.73061, -73.935242]} zoom={13} style={{ height: '95vh', width: '100%' }}>
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
                <CustomZoomControl />
            </MapContainer>
        </div>
    );
};

export default Map;
