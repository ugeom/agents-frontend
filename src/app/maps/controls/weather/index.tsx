// React imports
import { useState, useEffect, useRef } from 'react';

// Context imports
import { useWeather } from 'context/weather';
import { useGeo } from 'context/geo';
import { useThreeLayer } from 'context/three';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';

// Note: WeatherLayersGL processing happens in the backend

// Styles
import './WeatherControl.scss';

export const WeatherControl = () => {
    const { mapRef } = useGeo();
    const { sceneRef } = useThreeLayer();
    const {
        activeLayerTypes,
        toggleLayerType
    } = useWeather();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (mapRef.current) {
            toggleWeatherLayers();
        }
    }, [activeLayerTypes]);


    const toggleWeatherLayers = () => {
        if (!mapRef.current) return;

        const map = mapRef.current.getMap();

        // Define the mapping between UI layer types and backend-generated layer IDs
        const layerMapping = {
            temperature: [
                'weather-temperature-contours',
                'weather-temperature-fill',
                'weather-temperature-points',
                'weather-temperature-labels'
            ],
            wind: [
                'weather-wind-barbs',
                'weather-wind-vectors'
            ],
            pressure: [
                'weather-pressure-contours',
                'weather-pressure-fill'
            ],
            precipitation: [
                'weather-precipitation-contours',
                'weather-precipitation-fill'
            ]
        };

        // Toggle visibility for each layer type
        Object.keys(layerMapping).forEach(layerType => {
            const layerIds = layerMapping[layerType as keyof typeof layerMapping];
            const isVisible = activeLayerTypes.includes(layerType);

            layerIds.forEach(layerId => {
                if (map.getLayer(layerId)) {
                    map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
                }
            });
        });
    };


    return (
        <div className="weather-control">
            <button
                className={`weather-toggle ${isVisible ? 'active' : ''}`}
                onClick={() => setIsVisible(!isVisible)}
                title="Weather Control"
            >
                🌤️
            </button>

            {isVisible && (
                <div className="weather-panel">
                    <div className="weather-header">
                        <h3>Weather Layers</h3>
                    </div>

                    <div className="weather-controls">
                        <div className="layer-toggles">
                            {[
                                { type: 'temperature', label: 'Temperature', icon: '🌡️' },
                                { type: 'wind', label: 'Wind', icon: '💨' },
                                { type: 'pressure', label: 'Pressure', icon: '🔵' },
                                { type: 'precipitation', label: 'Precipitation', icon: '🌧️' }
                            ].map(({ type, label, icon }) => (
                                <label key={type} className="layer-toggle">
                                    <input
                                        type="checkbox"
                                        checked={activeLayerTypes.includes(type)}
                                        onChange={() => toggleLayerType(type)}
                                    />
                                    <span className="layer-icon">{icon}</span>
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

WeatherControl.displayName = "WeatherControl";