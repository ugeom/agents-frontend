// App imports
import { getFillLayer } from 'utils/map/layers/boundary/fill';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Fill = ({ marker, boundary }: any) => {
	const { id, fillColor, fillOpacity } = marker;
	
	const fillId = `boundary-fill-${id}`;
	const sourceId = `boundary-fill-source-${id}`;

	const fillLayer: any = getFillLayer(fillId, sourceId, fillColor, fillOpacity);

	return (
		<Source 
			id={sourceId} 
			type="geojson" 
			data={boundary}
		>
		    <Layer {...fillLayer}/>
		</Source>
	)
};

Fill.displayName="Fill";