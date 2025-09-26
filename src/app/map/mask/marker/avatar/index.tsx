// App import
import { Cross } from './cross';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';
import { useMask } from 'context/events/mask';

export const Avatar = ({ activeTrash, id, name, image }: any) => {
	const { isAddingMarker } = useMarkers();
	const { activateTrash } = useMask();

	return (
		<div 
			className="custom-marker"
			onClick={(e: any) => activateTrash(e, id, activeTrash)}
			style={{pointerEvents: isAddingMarker ? "none" : "auto"}}
		>
			<div style={{position: "relative"}}>
				{activeTrash && <Cross id={id}/>}
				<img 
					src={image} 
					alt="agent-avatar"
					className="agent-avatar"
				/>
			</div>
			<div className="marker-provider">
				{name}
			</div>
		</div>
	)
}

Avatar.displayName="Avatar";