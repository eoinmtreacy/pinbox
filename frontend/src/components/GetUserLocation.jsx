import React, { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

const CustomZoomControl = () => {
    // Get the map instance from the context provided by react-leaflet
    const map = useMap();

    useEffect(() => {
        // Manhattan, New York coordinates
        const manhattanCoordinates = L.latLng(40.7831, -73.9712);

        // Fly to the simulated location of Manhattan with a specified zoom level
        map.flyTo(manhattanCoordinates, 13); // Zoom level can be adjusted

        // Create a circle to simulate the accuracy radius of the location
        const radius = 200; // Accuracy radius in meters
        const circle = L.circle(manhattanCoordinates, { radius });
        circle.addTo(map); // Add the circle to the map

        // Optionally, set map bounds around the location to fit the circle
        const bounds = circle.getBounds();
        map.fitBounds(bounds);

        // Remove the default zoom controls from the map
        map.zoomControl.remove();
    }, [map]); // Dependency array to run the effect only once on mount

    // The component does not render anything, it only performs side effects
    return null;
};

export default CustomZoomControl;
