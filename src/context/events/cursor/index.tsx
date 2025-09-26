// React imports
import { useEffect, useRef, useContext, createContext } from 'react';

// Context imports
import { useMarkers } from 'context/events/markers';

const CursorContext: React.Context<any> = createContext(null);

export const useCursor = () => useContext(CursorContext)

export const CursorProvider = ({ children }: any) => {
	const customCursorRef = useRef<any>(null);

	const { isAddingMarker, setIsAddingMarker } = useMarkers();

	useEffect(() => {
		const offsetX = 30;
		const offsetY = 30;

		const moveCursor = (e: MouseEvent) => {
			if (customCursorRef.current) {
				customCursorRef.current.style.left = `${e.pageX - offsetX}px`;
				customCursorRef.current.style.top = `${e.pageY - offsetY}px`;
			}
		};

		if (isAddingMarker) {
			window.addEventListener('click', moveCursor, { once: true });
			window.addEventListener('mousemove', moveCursor);
		}

		return () => {
			window.removeEventListener('click', moveCursor);
			window.removeEventListener('mousemove', moveCursor);
		};
	}, [ isAddingMarker ]);

	useEffect(() => {
		const handleKeyDown = (event: any) => event.keyCode === 27 && setIsAddingMarker(false);
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [ setIsAddingMarker ]);

	return (
		<CursorContext.Provider value={{ customCursorRef }}>
			{children}
		</CursorContext.Provider>
	)
}

CursorContext.displayName = "CursorContext";