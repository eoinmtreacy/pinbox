import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../App.css';
import ReactDOMServer from 'react-dom/server';
import PreferenceWithoutButtons from './PreferenceWithoutButtons';

const CustomMap = ({ geoJsonData }) => {
    const geoJsonLayerRef = useRef(null);
    const mapRef = useRef(null);
    const [initialLoad, setInitialLoad] = useState(true);

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
                color = 'gray';
                break;
        }

        return L.divIcon({
            className: 'custom-marker',
            html: `<span style="${markerHtmlStyles(color)}" />`,
        });
    };

    const createPopupContent = (feature) => {
        const div = document.createElement('div');
        const props = {
            name: feature.properties.name,
            image: feature.properties.image,
            type: feature.properties.type,
            address: feature.properties.address,
            rating: feature.properties.rating,
            phone: feature.properties.phone,
            hours: feature.properties.hours,
            price: feature.properties.price,
            socialMedia: feature.properties.socialMedia,
            preference: feature.properties.preference, // Pass preference
        };

        const popupContent = ReactDOMServer.renderToString(<PreferenceWithoutButtons {...props} />);
        div.innerHTML = popupContent;
        return div;
    };

    const addMarkersToMap = (data) => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.clearLayers();
            if (data) {
                data.features.forEach((feature) => {
                    const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                        icon: getMarkerIcon(feature.properties.preference),
                    });

                    if (feature.properties?.name) {
                        const popupContent = createPopupContent(feature);
                        marker.bindPopup(popupContent);
                    }

                    geoJsonLayerRef.current.addLayer(marker);
                });
            }
            geoJsonLayerRef.current.addTo(mapRef.current);
        }
    };

    useEffect(() => {
        if (mapRef.current && initialLoad) {
            addMarkersToMap(geoJsonData);
            setInitialLoad(false);
        }
    }, [geoJsonData, initialLoad]);

    return (
        <div className="map-container relative flex flex-col h-screen">
            <MapContainer
                center={[40.7478017, -73.9914126]}
                zoom={13}
                className="h-full w-full"
                whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance;
                    if (initialLoad) {
                        mapInstance.setView([40.7478017, -73.9914126], 13);
                        setInitialLoad(false);
                    }
                }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {geoJsonData && (
                    <LayerComponent
                        data={geoJsonData}
                        geoJsonLayerRef={geoJsonLayerRef}
                        getMarkerIcon={getMarkerIcon}
                        createPopupContent={createPopupContent}
                    />
                )}
            </MapContainer>
        </div>
    );
};

const LayerComponent = ({ data, geoJsonLayerRef, getMarkerIcon, createPopupContent }) => {
    const map = useMap();

    useEffect(() => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.clearLayers();
            if (data) {
                data.features.forEach((feature) => {
                    const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                        icon: getMarkerIcon(feature.properties.preference),
                    });

                    if (feature.properties?.name) {
                        const popupContent = createPopupContent(feature);
                        marker.bindPopup(popupContent);
                    }

                    geoJsonLayerRef.current.addLayer(marker);
                });
            }
        } else {
            geoJsonLayerRef.current = L.layerGroup();
            if (data) {
                data.features.forEach((feature) => {
                    const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                        icon: getMarkerIcon(feature.properties.preference),
                    });

                    if (feature.properties?.name) {
                        const popupContent = createPopupContent(feature);
                        marker.bindPopup(popupContent);
                    }

                    geoJsonLayerRef.current.addLayer(marker);
                });
            }
            geoJsonLayerRef.current.addTo(map);
        }
    }, [data, getMarkerIcon, map, createPopupContent]);

    return null;
};

export default CustomMap;
