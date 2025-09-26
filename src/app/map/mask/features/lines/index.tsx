// App imports
import { getLinesLayer } from 'utils/map/layers/features/lines';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ id, data }: any) => {
	const sourceId = `lines-source-${id}`;
	const layerId = `lines-layer-${id}`;

	const strokeLayer: any = getLinesLayer(layerId, sourceId);

	return (
		<Source 
		  id={sourceId} 
		  type="geojson" 
		  data={data}
		>
		  <Layer {...strokeLayer}/>
		</Source>
	)
}

Lines.displayName="Lines";