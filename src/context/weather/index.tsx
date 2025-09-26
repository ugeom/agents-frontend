// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useAgentApi } from 'context/agent';
import { useGeo } from 'context/geo';

// Third-party imports
import * as turf from '@turf/turf';

const WeatherContext: React.Context<any> = createContext(null);

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }: any) => {
    const { agentData, fetchAgent } = useAgentApi();
    const { mapRef } = useGeo();
    const [weatherData, setWeatherData] = useState<any>(null);
    const [weatherLayers, setWeatherLayers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeLayerTypes, setActiveLayerTypes] = useState<string[]>([]);

    // Process agent data when get_weather tool responds
    useEffect(() => {
        if (!agentData || !agentData.result || agentData.tool_name !== "get_weather") return;

        console.log('Weather agent data received:', agentData);

        try {
            setIsLoading(true);

            // Parse the JSON response and execute the code like Turf context does
            const parsedData = JSON.parse(agentData.result);
            console.log('Parsed weather data:', parsedData);

            if (parsedData.weather_layers) {
                setWeatherLayers(parsedData.weather_layers);
            }

            // Execute the weather code to generate the actual data
            if (parsedData.code && mapRef.current) {
                // Inject dependencies like Turf context does
                (window as any).turf = turf;
                (window as any).map = mapRef.current.getMap();

                // Handle both array and string code formats
                let fullCode;
                if (Array.isArray(parsedData.code)) {
                    fullCode = parsedData.code.join('\n');
                } else {
                    fullCode = parsedData.code;
                }

                console.log('Executing weather code...');
                const fn = new Function(fullCode);
                fn();
            }

            // Auto-enable temperature layer
            if (activeLayerTypes.length === 0) {
                setActiveLayerTypes(['temperature']);
            }

        } catch (error) {
            console.error('Error processing weather data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [agentData, mapRef, activeLayerTypes.length]);

    const fetchWeatherData = async (lat: number, lon: number, weatherType = 'all') => {
        // This is now handled by the agent system
        return { lat, lon, weatherType };
    };

    const toggleLayerType = (layerType: string) => {
        const updatedTypes = activeLayerTypes.includes(layerType)
            ? activeLayerTypes.filter(type => type !== layerType)
            : [...activeLayerTypes, layerType];

        setActiveLayerTypes(updatedTypes);

        // Trigger weather API call with the updated layer types
        if (updatedTypes.length > 0) {
            const weatherQuery = `Show global weather layers: ${updatedTypes.join(', ')}`;
            fetchAgent(weatherQuery);
        }
    };

    const clearWeatherData = () => {
        setWeatherData(null);
        setWeatherLayers([]);
        setActiveLayerTypes([]);
    };

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                weatherLayers,
                isLoading,
                activeLayerTypes,
                fetchWeatherData,
                toggleLayerType,
                clearWeatherData,
                setWeatherData,
                setWeatherLayers,
                setActiveLayerTypes,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

WeatherProvider.displayName = "WeatherProvider";