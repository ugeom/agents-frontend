// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useAgentApi } from 'context/agent';
import { useGeo } from 'context/geo';

// App imports
import { linesWithin } from './within';

// Constants
import { getRoadColor, ROAD_LAYER_IDS } from 'utils/constants/roads';

// Third-party imports
import * as turf from '@turf/turf';

const RoadsContext: React.Context<any> = createContext(null)

export const useRoads = () => useContext(RoadsContext);

export const RoadsProvider = ({children}: any) => {
	const { agentData } = useAgentApi();
	const { mapRef } = useGeo();

	const [ roadData, setRoadData ] = useState<any>(null);

	const updateRoadData = () => {
		const map = mapRef?.current?.getMap();
		if (!map) return;

		// Query features from existing road layers
		try {
			let features: any[] = [];

			ROAD_LAYER_IDS.forEach(layerId => {
				if (map.getLayer(layerId)) {
					// Query all visible features on the map for this layer
					const layerFeatures = map.queryRenderedFeatures({ layers: [layerId] });
					console.log(`Found ${layerFeatures.length} features in layer ${layerId}`);
					features = features.concat(layerFeatures);
				} 
				else {
					console.log(`Layer ${layerId} not found`);
				}
			});

			if (features.length > 0) {
				const processedFeatures = features.map(feature => {
					const roadClass = feature.properties.class || 'street';
					return {
						properties: {
							class: roadClass,
							'road-color': getRoadColor(roadClass)
						}
					};
				});

				console.log(`Processed ${processedFeatures.length} road features for chart`);
				setRoadData({ type: 'FeatureCollection', features: processedFeatures });
			} 
			else {
				console.log('No road features found - map may not be loaded or layers may not exist');
			}
		} 
		catch (error) {
			console.warn('Error updating road data:', error);
		}
	};

	useEffect(() => {
	    if (!agentData || !agentData.result || !agentData.tool_name) return;
	    if (agentData.tool_name === "get_roads") {
	    	try {
	    		// Inject dependencies into global scope
	    		(window as any).turf = turf;
	    		(window as any).map = mapRef.current.getMap();

	    		// Inject road cutting functions globally - following ThreeProvider pattern
	    		(window as any).linesWithin = linesWithin;
	    		(globalThis as any).linesWithin = linesWithin;

		        // Parse the code and join it into one executable string
		        const codeArray = JSON.parse(agentData.result)['code'];

				const fullCode = codeArray.join('\n').replaceAll("mapRef", "map")

				// Execute all at once to preserve variable scope
				const sanitizedFullCode = fullCode.replace(/const complete_data = \[[\s\S]*?\];/g, '');
				console.log('Executing roads code:', sanitizedFullCode);
				const fn = new Function(fullCode);
				fn();

				// Listen for when the road layers are actually added
				const map = mapRef.current.getMap();

				const checkForLayers = () => {
					setTimeout(() => {
						if (map.getLayer(ROAD_LAYER_IDS[0])) {
							updateRoadData();
						} 
						else {
							checkForLayers();
						}
					}, 500);
				};

				checkForLayers();
			}
			catch (err) {
				console.error('Error executing roads code:', err);
			}
		}
    }, [ agentData ]);

	// Add map event listeners for live updates
	useEffect(() => {
		const map = mapRef?.current?.getMap();
		if (!map) return;

		const handleMapEvent = () => setTimeout(updateRoadData, 100);

		// Try to get initial road data if layers already exist
		setTimeout(() => {
			console.log('Checking for existing road layers on mount...');
			updateRoadData();
		}, 1000);

		map.on('moveend', handleMapEvent);
		map.on('zoomend', handleMapEvent);

		return () => {
			map.off('moveend', handleMapEvent);
			map.off('zoomend', handleMapEvent);
		};

	}, [ mapRef, roadData ]);

	return (
		<RoadsContext.Provider value={{ roadData }}>
			{children}
		</RoadsContext.Provider>
	)
}

RoadsContext.displayName = "RoadsContext";