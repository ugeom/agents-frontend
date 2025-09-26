// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useMarkers } from 'context/events/markers';

const MaskContext: React.Context<any> = createContext(null);

export const useMask = () => useContext(MaskContext)

export const MaskProvider = ({ children }: any) => {
	const { updateMarkerProperty } = useMarkers();

	const [ dragging, setDragging ] = useState(false);

	const onDragStart = (e: any, id: any) =>  {
		setDragging(true);
		updateMarkerProperty(id, 'activeTrash', false);
	};

	const onDrag = (e: any, id: any, boundaryType: any) => {
		if (boundaryType !== "iso") {
			updateMarkerProperty(id, "center", e.lngLat);
		}
	};

	const onDragEnd = (e: any, id: any, boundaryType: any) => {
		setTimeout(() => setDragging(false), 0);
		if (boundaryType === "iso") {
			updateMarkerProperty(id, "center", e.lngLat);
		}
	};

	const activateTrash = (e: any, id: any, activeTrash: any) => {
		e.stopPropagation();
		!dragging && updateMarkerProperty(id, 'activeTrash', activeTrash ? false : true);
	};

	return (
		<MaskContext.Provider value={{
			onDragStart,
			onDrag,
			onDragEnd,
			activateTrash
		}}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";