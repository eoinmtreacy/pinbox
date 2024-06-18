import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

const GetUserLocation = () => {
    const map = useMap();

    useEffect(() => {
        // Manhattan, New York coordinates
        const manhattanCoordinates = L.latLng(40.7831, -73.9712);

        // Simulate location found
        map.flyTo(manhattanCoordinates, 13); // You can adjust the zoom level here
        const radius = 200; // Simulated accuracy radius in meters
        const circle = L.circle(manhattanCoordinates, { radius });
        circle.addTo(map);

        // Optionally set bounds around the location
        const bounds = circle.getBounds();
        map.fitBounds(bounds);

        // Remove default zoom controls
        map.zoomControl.remove();
    }, [map]);

    return null;
};

export default GetUserLocation;