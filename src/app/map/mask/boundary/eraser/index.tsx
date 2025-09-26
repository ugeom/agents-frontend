// App imports
import { getEraserLayer } from 'utils/map/layers/boundary/eraser';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Eraser = ({ id, boundary }: any) => {
	const eraserId = `boundary-eraser-layer-${id}`;
	const sourceId = `boundary-eraser-source-${id}`;

	const eraserLayer: any = getEraserLayer(eraserId, sourceId);

	return (
		<Source 
			id={sourceId} 
			type="geojson" 
			data={boundary}
		>
		    <Layer {...eraserLayer}/>
		</Source>
	)
};

Eraser.displayName="Eraser";