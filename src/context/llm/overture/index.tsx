// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useAgentApi } from 'context/agent';
import { useGeo } from 'context/geo';

// Utils
import { 
    fitMapToBounds, 
    createFeatureCollection, 
    parseWellKnownText, 
    extractCoordinatesFromPolygon,
    createGeoFeature 
} from 'utils';

const OvertureContext: React.Context<any> = createContext(null)

export const useOverture = () => {
	return (
		useContext(OvertureContext)
	)
}

export const OvertureProvider = ({children}: any) => {
	const { mapRef } = useGeo();
	const { agentData } = useAgentApi();

	const [ polygonData, setPolygonData ] = useState<any>(null);
    const [ pointData, setPointData ] = useState<any>([]);

    useEffect(() => {
        if (!agentData || !agentData.result || !agentData.tool_name) return;

        if (agentData.tool_name === "get_overture") {
	        let allCoords: [ number, number ][] = [];

	        const points: any[] = [];
	        const polygons: any[] = [];

	        JSON.parse(agentData.result).forEach((feature: any) => {
	            const geometry: any = parseWellKnownText(feature.geometry);
	            
	            const { type, coordinates } = geometry;
	            const [ longitude, latitude ] = coordinates;

	            if (type === "Point") {
	                points.push({ longitude, latitude });
	                allCoords.push(coordinates);
	            }
	            
	            else if (type === "Polygon" || type === "MultiPolygon") {
	                polygons.push(createGeoFeature(geometry));

	                const extractedPoints = extractCoordinatesFromPolygon(coordinates, type);
	                allCoords = allCoords.concat(extractedPoints);
	            }
	        });

	        setPointData(points);
	        setPolygonData(createFeatureCollection(polygons));

	        // Fit to screen
	        fitMapToBounds(mapRef, allCoords);
        }
    }, [agentData]);

	return (
		<OvertureContext.Provider value={{
			polygonData, pointData
		}}>
			{children}
		</OvertureContext.Provider>
	)
}

OvertureContext.displayName = "OvertureContext";