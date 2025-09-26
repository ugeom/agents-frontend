// React imports  
import { useState } from 'react';

// App imports
import { Overture } from './overture';

// Context imports
import { useGeo } from 'context/geo';
import { useThreejsLayer } from 'context/threejs';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
    const { mapRef, mapStyle, Locations } = useGeo();
    const { threejsLayer } = useThreejsLayer();

    const [ isMapLoaded, setIsMapLoaded ] = useState(false);

    const onLoad = () => {
        setIsMapLoaded(true);
        const map = mapRef.current.getMap();
        map.addLayer(threejsLayer);
    }

    return (
        <Map
            ref={mapRef}
            initialViewState={Locations.other}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle={mapStyle}
            onLoad={onLoad}
            antialias={true}
        >
            {isMapLoaded && <Overture/>}
        </Map>
    );
};

Maps.displayName = "Maps";