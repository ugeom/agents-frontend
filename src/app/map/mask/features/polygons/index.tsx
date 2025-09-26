// App imports
import { getPolygonLayer } from 'utils/map/layers/features/polygons';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Polygons = ({ id, data }: any) => {
    const sourceId = `polygons-source-${id}`;
  	const layerId = `polygons-layer-${id}`;

  	const polygonLayer: any = getPolygonLayer(layerId, sourceId);

	return (
		<Source 
			id={sourceId} 
			type="geojson" 
			data={data}
		>
	        <Layer {...polygonLayer}/>
	    </Source>
	);
};

Polygons.displayName = "Polygons";
