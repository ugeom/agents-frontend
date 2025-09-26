// App  imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/events/markers';

export const Cross = ({ id }: any) => {
	const { removeMarker } = useMarkers();

	return (
      	<svg 
      		viewBox="0 0 20 20" 
      		width="20" 
      		className="cross-wrapper"
      		onClick={(e: any) => removeMarker(e, id)}
      	>
      		<circle
      			cx={10}
      			cy={10}
      			r={9}
      			className="cross-background"
      		/>
      		<line
				x1={5}
				x2={15}
				y1={5}
				y2={15}
				className="cross-line"
			/>
			<line
				x1={15}
				x2={5}
				y1={5}
				y2={15}
				className="cross-line"
			/>
			<rect
				x={0}
				y={0}
				width={20}
				height={20}
				fill="transparent"
			/>
		</svg>
	)
}

Cross.displayName="Cross"