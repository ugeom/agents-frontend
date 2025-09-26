// App imports
import { Boundary } from './boundary';
import { Properties } from './properties';
import { Chat } from './chat';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Selector = ({ marker, activeFeature, setActiveFeature }: any) => {
	const { id, fillColor, strokeColor } = marker;
	const { updateMarkerProperty } = useMarkers();

	document.documentElement.style.setProperty('--fillColor', fillColor);
	document.documentElement.style.setProperty('--strokeColor', strokeColor);

	const isActiveColor = (name: any) => 
		activeFeature === name ? 
		"rgba(52, 152, 219, 0.3)" : 
		"rgba(255, 255, 255, 0)";

	const onClick = (name: any) => {
		setActiveFeature(name)
		if (name === "circle" || name === "iso") {
			updateMarkerProperty(id, "boundaryType", name);
		}
	}

	return (
		<div className="selector">
			<Chat onClick={onClick} isActiveColor={isActiveColor}/>
			<Boundary onClick={onClick} isActiveColor={isActiveColor}/>
			<Properties onClick={onClick} isActiveColor={isActiveColor}/>
		</div>
	)
}

Selector.displayName="Selector";