// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';
import { useCursor } from 'context/events/cursor';

export const Cursor = () => {
	const { isAddingMarker, currentImage } = useMarkers();
	const { customCursorRef } = useCursor();

	if (!isAddingMarker) return <></>;

	return (
		<img 
			ref={customCursorRef} 
			className="custom-cursor"
			src={currentImage || ''} 
			alt="add-pin" 
		/>
	)
}

Cursor.displayName="Cursor";