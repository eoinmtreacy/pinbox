import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import PreferenceWithoutButtons from './PreferenceWithoutButtons';
import SearchBar from './SearchBar';
import CookieModal from './CookieModal';
import useFetchGeoJson from '../hooks/useFetchGeoJson';
import useFetchBusyness from '../hooks/useFetchBusyness';
import useFetchPlaces from '../hooks/useFetchPlaces';
import HorizontalButtons from './HorizontalButtons';
import colorGen from '../utils/colorGen';
import iconGen from '../utils/iconGen';
import BusynessTable from './Map/BusynessTable';

import LoadingSpinner from './LoadingSpinner';

const CustomMap = ({ pins, showBusynessTable }) => {
    const { data: taxiZones, error: geoJsonError, loading: loadingGeoJson } = useFetchGeoJson('/taxi_zones.geojson');
    const { data: busynessData, error: busynessError, loading: loadingBusyness } = useFetchBusyness();
    const { places, error: placesError, loading: loadingPlaces } = useFetchPlaces();

    const mapRef = useRef(null);
    const [initialLoad, setInitialLoad] = useState(true);

    if (geoJsonError || busynessError || placesError) {
        return (
            <div>Error fetching data: {geoJsonError?.message || busynessError?.message || placesError?.message}</div>
        );
    }

    if (loadingGeoJson || loadingBusyness || loadingPlaces) {
        return <LoadingSpinner />;
    }

    return (
        <div className="map-container relative flex flex-col h-screen">
            <div className="flex flex-col md:flex-row md:items-start absolute top-1 left-0.5 right-0 z-[1000] space-y-4 md:space-y-0 md:space-x-4">
                <div className="desktop-searchbar w-full md:w-auto flex justify-end md:justify-start">
                    <SearchBar />
                </div>
                <div className="desktop-horizontal-buttons w-full md:w-auto flex justify-end md:justify-start">
                    <HorizontalButtons />
                </div>
            </div>
            <div className="horizontal-buttons-wrapper">
                <HorizontalButtons />
            </div>
            <MapContainer
                center={[40.7478017, -73.9914126]}
                zoom={13}
                className="h-full w-full"
                zoomControl={false} // Disable zoom control buttons
                whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance;
                    if (initialLoad) {
                        mapInstance.setView([40.7478017, -73.9914126], 13);
                        setInitialLoad(false);
                    }
                }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {taxiZones && busynessData && (
                    <GeoJSON
                        data={taxiZones}
                        style={(feature) => {
                            const locationId = feature.properties.location_id;
                            const busyness = busynessData[locationId] || 0;
                            const color = colorGen(busyness);

                            return {
                                color: color,
                                weight: 0.5,
                                fillOpacity: 0.5,
                            };
                        }}
                    />
                )}
                {pins &&
                    pins.map((pin) => (
                        <Marker key={pin.id} position={[pin.lat, pin.lon]} icon={iconGen(pin.attitude)}>
                            <Popup>
                                <PreferenceWithoutButtons
                                    name={pin.name}
                                    image={pin.photo_0}
                                    type={pin.subtype}
                                    address={`${pin.addr_Housenumber || ''} ${pin.addr_Street || ''}`}
                                    hours={pin.opening_Hours}
                                    socialMedia={pin.website}
                                    preference={pin.attitude}
                                />
                            </Popup>
                        </Marker>
                    ))}
                <div className="absolute bottom-2 z-[1000]">
                    <CookieModal />
                </div>

                {showBusynessTable && (
                    <div className="busyness-table z-[1000]">
                        <BusynessTable />
                    </div>
                )}

            </MapContainer>
        </div>
    );
};

export default CustomMap;
