// App imports
import { getLinesLayer } from 'utils/map/layers/boundary/lines';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ marker, boundary }: any) => {
	const { id, strokeColor, strokeWidth, strokeOpacity } = marker;
	
	const strokeId = `boundary-lines-layer-${id}`;
	const sourceId = `boundary-lines-source-${id}`;

	const strokeLayer: any = getLinesLayer(strokeId, sourceId, strokeColor, strokeOpacity, strokeWidth);

	return (
		<Source 
			id={sourceId} 
			type="geojson" 
			data={boundary}
		>
		    <Layer {...strokeLayer}/>
		</Source>
	)
};

Lines.displayName="Lines";