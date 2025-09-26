// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null);

export const useGeo = () => useContext(GeoContext)

export const GeoProvider = ({children}: any) => {
	const mapRef = useRef<any>(null);
	const [ viewport, setViewport ] = useState(Locations.sp);
	const [ mapStyle, setMapStyle ] = useState<string>("mapbox://styles/mapbox/dark-v11");
	const { latitude, longitude } = viewport;


	useEffect(() => {
		const viewportFlyTo = () => {
			mapRef.current?.flyTo({
				center: [ longitude, latitude ],
				duration: 3000, 
				essential: true,
			});	
		}
		viewport && viewportFlyTo();
	}, [ viewport ]);

	return (
		<GeoContext.Provider value={{
			mapRef, Locations,
			viewport, setViewport,
			mapStyle
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";