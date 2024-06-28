import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import GetUserLocation from './GetUserLocation';
import CookieModal from './CookieModal';
import SideNav from './SideNav';
import Preference from './Preference';
import Friends from './Friends';
import HorizontalButtons from './HorizontalButtons';
import '../App.css';

// Update Leaflet icon paths to resolve missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const CustomMap = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [showPreference, setShowPreference] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [timeStamp, setTimeStamp] = useState(12);
    const [distance, setDistance] = useState(50);
    const [showPins, setShowPins] = useState(true);
    const [mode, setMode] = useState('Day');
    const mapRef = useRef(); // Ref for accessing map instance
    const geoJsonLayerRef = useRef(); // Ref for GeoJSON layer

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('preference_sample_data.geojson');
                if (!response.ok) {
                    throw new Error('Failed to fetch GeoJSON data');
                }
                const data = await response.json();
                // Filter out features with preference === 'default'
                const filteredData = data.features.filter((feature) => feature.properties.preference !== 'default');
                console.log('Fetched GeoJSON data:', filteredData); // Log fetched data
                setGeoJsonData(filteredData);
            } catch (error) {
                console.error('Error fetching GeoJSON data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    useEffect(() => {
        if (!mapRef.current || !geoJsonData) return;

        // Clear existing GeoJSON layer if it exists
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.clearLayers();
        }

        // Create new GeoJSON layer
        const geoJsonLayer = L.geoJSON(geoJsonData, {
            pointToLayer: (feature, latlng) => {
                const customIcon = getMarkerIcon(feature.properties.preference);
                return L.marker(latlng, { icon: customIcon });
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties?.name) {
                    layer.bindPopup(
                        `<b>Name : ${feature.properties.name}</b><br />Amenity : ${feature.properties.type}<br />Preference : ${feature.properties.preference}`
                    );
                }
            },
        });

        // Add GeoJSON layer to the map
        geoJsonLayer.addTo(mapRef.current);
        geoJsonLayerRef.current = geoJsonLayer; // Save reference to the layer

        return () => {
            // Clean up on unmount
            mapRef.current.removeLayer(geoJsonLayerRef.current);
        };
    }, [geoJsonData]); // Re-run effect when geoJsonData changes

    const handlePreferenceToggle = () => {
        setShowPreference((prev) => !prev);
        if (showFriends) setShowFriends(false); // Ensure only one panel is open at a time
    };

    const handleFriendsToggle = () => {
        setShowFriends((prev) => !prev);
        if (showPreference) setShowPreference(false); // Ensure only one panel is open at a time
    };

    // Define marker colors based on preference
    const getMarkerIcon = (preference) => {
        const markerHtmlStyles = (color) => `
            background-color: ${color};
            width: 2rem;
            height: 2rem;
            display: block;
            left: -1rem;
            top: -1rem;
            position: relative;
            border-radius: 1rem 1rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF`;

        let color;
        switch (preference) {
            case 'hate it':
                color = 'red';
                break;
            case "don't care":
                color = 'pink';
                break;
            case 'interested':
                color = 'blue';
                break;
            case 'love it':
                color = 'green';
                break;
            default:
                color = 'black';
                break;
        }

        return L.divIcon({
            className: 'custom-marker',
            html: `<span style="${markerHtmlStyles(color)}" />`,
        });
    };

    return (
        <div className="relative flex flex-col h-screen">
            <div className="flex flex-grow">
                <SideNav
                    onPreferenceToggle={handlePreferenceToggle}
                    onFriendsToggle={handleFriendsToggle}
                    timeStamp={timeStamp}
                    setTimeStamp={setTimeStamp}
                    distance={distance}
                    setDistance={setDistance}
                    showPins={showPins}
                    setShowPins={setShowPins}
                    mode={mode}
                    setMode={setMode}
                />
                {showPreference && (
                    <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full">
                        <Preference />
                    </div>
                )}
                {showFriends && (
                    <div className="w-1/4 p-4 bg-white border-r border-gray-300 h-full">
                        <Friends userId={1} />
                    </div>
                )}
                <div className={`relative h-full flex-grow ${showPreference || showFriends ? 'w-3/4' : 'w-full'}`}>
                    <div className="absolute top-1 left-16 right-0 z-[1000] flex space-y-4">
                        <SearchBar />
                        <HorizontalButtons />
                    </div>
                    <MapContainer
                        center={[40.7478017, -73.9914126]}
                        zoom={13}
                        className="h-full w-full"
                        whenCreated={(map) => (mapRef.current = map)} // Assign map instance to ref
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {geoJsonData && (
                            <GeoJSON
                                data={geoJsonData}
                                pointToLayer={(feature, latlng) => {
                                    const customIcon = getMarkerIcon(feature.properties.preference);
                                    return L.marker(latlng, { icon: customIcon });
                                }}
                                onEachFeature={(feature, layer) => {
                                    if (feature.properties?.name) {
                                        layer.bindPopup(
                                            `<b>Name : ${feature.properties.name}</b><br />Amenity : ${feature.properties.type}<br />Preference : ${feature.properties.preference}`
                                        );
                                    }
                                }}
                            />
                        )}
                        <GetUserLocation />
                        <div className="absolute bottom-2 z-50">
                            <CookieModal />
                        </div>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default CustomMap;
