// React imports
import { useEffect } from 'react';

// App imports
import { Avatar } from './avatar';
import { Tooltip } from './tooltip';
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';
import { useMask } from 'context/events/mask';
import { useBoundary } from 'context/events/boundary';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const CustomMarker = ({ marker }: any) => {
	const { mapRef } = useGeo();
	const { onDragStart, onDrag, onDragEnd } = useMask();
	const { updateMarkersData } = useBoundary();

	const { id, name, center, image, radius, boundaryType, routingProfile, contoursMinutes, activeTrash } = marker;

	const map = mapRef?.current?.getMap();

	const updateBoundary = () => updateMarkersData(marker);
	
	useEffect(() => {
		updateBoundary();
	}, [ boundaryType, center, radius, contoursMinutes, routingProfile ]);

	useEffect(() => {
		if (!map) return;
		map.on('zoomend', updateBoundary);
		return () => {
			map.off('zoomend', updateBoundary);
		};
	}, [ map, boundaryType, center, radius, contoursMinutes, routingProfile ]);

	return (
		<Marker
			key={id}
			longitude={center.lng}
			latitude={center.lat}
			anchor="bottom"
			draggable
            onDrag={(e: any) => onDrag(e, id, boundaryType)}
			onDragStart={(e: any) => onDragStart(e, id)}
			onDragEnd={(e: any) => onDragEnd(e, id, boundaryType)}
		>
			<Avatar activeTrash={activeTrash} id={id} name={name} image={image}/>
			{activeTrash && <Tooltip marker={marker}/>}
	    </Marker>
	)
}

CustomMarker.displayName="CustomMarker";