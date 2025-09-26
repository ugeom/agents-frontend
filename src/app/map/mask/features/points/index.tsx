// App imports
import { getPointsLayer } from 'utils/map/layers/features/points';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Points = ({ id, data }: any) => {
  const sourceId = `points-source-${id}`;
  const layerId = `points-layer-${id}`;

  const pointsLayer: any = getPointsLayer(layerId, sourceId);

  return (
    <Source 
      id={sourceId} 
      type="geojson" 
      data={data}
    >
      <Layer {...pointsLayer} />
    </Source>
  );
};

Points.displayName = 'Points';