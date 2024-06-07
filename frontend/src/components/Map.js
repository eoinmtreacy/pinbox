import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Header from './Header';
import SearchBar from './SearchBar';
import React from 'react';

import 'leaflet/dist/leaflet.css';

const CustomZoomControl = () => {
    const map = useMap();

    React.useEffect(() => {
        map.zoomControl.remove();
    }, [map]);

    return null;
};

const MapComponent = () => {
    return (
        <div className="relative z-10" style={{ height: '100vh', padding: '10px' }}>
            <div className="absolute top-0 left-0 right-0 z-[1000]">
                {' '}
                <Header />
            </div>

            <div className="absolute top-16 left-0 right-0 z-[1000]">
                {' '}
                <SearchBar />
            </div>
            <MapContainer center={[40.7587433, -73.979915]} zoom={13} style={{ height: '95vh', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[40.7587433, -73.979915]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <CustomZoomControl />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
