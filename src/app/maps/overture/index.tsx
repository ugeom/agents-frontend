// Context imports
import { useOverture } from 'context/llm/overture'

// Third-party imports
import { Marker, Source, Layer } from 'react-map-gl/mapbox';

export const Overture = () => {
	const { polygonData, pointData } = useOverture();

	return (
		<>
			{polygonData && (
			    <Source 
			        id="polygon-source" 
			        type="geojson" 
			        data={polygonData}
			    >
			        <Layer 
			            id="polygon-layer" 
			            type="fill" 
			            paint={{ 
			                'fill-color': '#088', 
			                'fill-opacity': 0.5 
			            }} 
			        />
			    </Source>
			)}
			{pointData.map((point: any, index: any) => (
			    <Marker 
			        key={index} 
			        longitude={point.longitude} 
			        latitude={point.latitude}
			    >
			        📍
			    </Marker>
			))}
		</>
	)
}

Overture.displayName="Overture";