import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet'; 

const GetUserLocation = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    map.flyTo([latitude, longitude], 13);
                },
                (err) => {
                    console.error(err);
                }
            );
        }
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup> {/* Use Popup here */}
        </Marker>
    );
};

export default GetUserLocation;
