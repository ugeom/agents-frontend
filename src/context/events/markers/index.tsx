// React imports
import { useState, useContext, createContext, useMemo, useCallback } from 'react';

// Types imports
import { MarkersContextType, MarkerType, ProviderType } from 'utils/types/markers';
import { ContextProviderProps } from 'utils/types/context';

// Utils imports
import { generateMarkerId } from 'utils/markers';

const MarkersContext: React.Context<MarkersContextType | null> = createContext<MarkersContextType | null>(null);

export const useMarkers = (): MarkersContextType => {
	const context = useContext(MarkersContext);
	if (!context) {
		throw new Error('useMarkers must be used within a MarkersProvider');
	}
	return context;
}

/**
 * Manages all marker state and interaction: create, update, remove
 * Shares isAddingMarker, currentImage, currentProvider
 * Exposes updateMarkerProperty, startAddingMarker, generateMarkerId, createMarker
 */
export const MarkersProvider = ({children}: ContextProviderProps) => {
	const [ activePage, setActivePage ] = useState<string | null>(null);
	const [ isAddingMarker, setIsAddingMarker ] = useState<boolean>(false);
	
	// markers properties	
	const [ markers, setMarkers ] = useState<Record<string, MarkerType>>({});
	const [ currentMarkerId, setCurrentMarkerId ] = useState<number | null>(null);
	const [ currentImage, setCurrentImage ] = useState<string | null>(null);
	const [ currentProvider, setCurrentProvider ] = useState<ProviderType | null>(null);

	const startAddingMarker = useCallback((src: string, provider: ProviderType) => {
		setIsAddingMarker((prev: boolean) => !prev);
		setCurrentImage(src);
		setCurrentProvider(provider);
		const isMobile = window.matchMedia("(max-width: 768px)");
		isMobile.matches && setActivePage(null);
	}, []);

	const createMarker = useCallback((id: number, center: { lng: number; lat: number }): MarkerType => ({
		id,
		center,
		image: currentImage || '',
		radius: 0.5,
		contoursMinutes: 10,
		fillColor: "rgba(166, 204, 245, 0.8)",
		fillOpacity: 0.1,
		strokeWidth: 4,
		strokeColor: "rgba(166, 204, 245, 1)",
		strokeOpacity: 0.8,
		routingProfile: "walking",
		boundaryType: "circle",
		activeTrash: false,
		layer: currentProvider?.layer || '',
		boundary: null,
		data: null,
		...(currentProvider ? Object.fromEntries(
			Object.entries(currentProvider).filter(([key]) => !['layer'].includes(key))
		) : {}),
	}), [currentImage, currentProvider]);

    const buildMarker = useCallback(async (event: { lngLat: { lng: number; lat: number } }) => {
    	if (isAddingMarker) {
    		const id = generateMarkerId(markers);
    		const center = event.lngLat;
			const newMarker = createMarker(id, center);
			setMarkers((prev: Record<string, MarkerType>) => ({ 
				...prev, [id]: newMarker 
			}));
			setIsAddingMarker(false);
		}
	}, [isAddingMarker, markers, createMarker]);

	const removeMarker = useCallback((event: React.MouseEvent, markerId: string | number) => {
	    event.stopPropagation();
	    setMarkers((prev: Record<string, MarkerType>) => {
	        const { [markerId]: _, ...rest } = prev;
	        return rest;
	    });
	}, []);

	const updateMarkerProperty = useCallback((markerId: string | number, key: string, value: string | number | boolean | { lng: number; lat: number }) => {
	    setMarkers((prev: Record<string, MarkerType>) => ({
	        ...prev,
	        [markerId]: {
	            ...prev[markerId],
	            [key]: value,
	        },
	    }));
	}, []);

	const contextValue = useMemo(() => ({
		markers, setMarkers, startAddingMarker, 
		buildMarker, removeMarker, updateMarkerProperty,
		currentMarkerId, setCurrentMarkerId,
		currentImage, setCurrentImage,
		currentProvider, setCurrentProvider,
		activePage, setActivePage,
		isAddingMarker, setIsAddingMarker,
		generateMarkerId: () => generateMarkerId(markers),
		createMarker: (center: { lng: number; lat: number }) => createMarker(generateMarkerId(markers), center),
	}), [
		markers, startAddingMarker, buildMarker, removeMarker, updateMarkerProperty,
		currentMarkerId, currentImage, currentProvider, activePage, isAddingMarker, createMarker
	]);

	return (
		<MarkersContext.Provider value={contextValue}>
			{children}
		</MarkersContext.Provider>
	)
}

MarkersContext.displayName = "MarkersContext";