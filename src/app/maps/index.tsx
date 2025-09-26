// Context imports
import { useGeo } from 'context/geo';
import { useThreeLayer } from 'context/three';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// Components
import { WeatherControl } from './controls/weather';

export const Maps = () => {
    const { mapRef, Locations } = useGeo();
    const { threeLayer } = useThreeLayer();

    const onLoad = () => {
        const map = mapRef.current.getMap();
        map.addLayer(threeLayer);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Map
                ref={mapRef}
                initialViewState={Locations.other}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/hvoking/cmfxk6yn5003w01s1f2ir3qzx"
                onLoad={onLoad}
                antialias={true}
            >
            </Map>
            <WeatherControl />
        </div>
    );
};

Maps.displayName = "Maps";