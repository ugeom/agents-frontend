// App imports
import { Arrow } from './arrow';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Buttons = ({ marker, activeCharts, setActiveCharts }: any) => {
	const { removeMarker } = useMarkers();
	
	const deleteAgent = (e: any) => removeMarker(e, marker.id);
	
	return (
		<div className="header-buttons">
			<Arrow activeCharts={activeCharts} setActiveCharts={setActiveCharts}/>
			<div className="close-btn" onClick={deleteAgent}>✖</div>
		</div>
	)
}

Buttons.displayName="Buttons";