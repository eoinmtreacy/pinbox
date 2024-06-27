import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

const GetUserLocation = () => {
    const map = useMap();

    useEffect(() => {
        const manhattanCoordinates = L.latLng(40.7831, -73.9712);

        map.flyTo(manhattanCoordinates, 13); 
        const radius = 200; 
        const circle = L.circle(manhattanCoordinates, { radius });
        circle.addTo(map);

        const bounds = circle.getBounds();
        map.fitBounds(bounds);

        map.zoomControl.remove();
    }, [map]);

    return null;
};

export default GetUserLocation;