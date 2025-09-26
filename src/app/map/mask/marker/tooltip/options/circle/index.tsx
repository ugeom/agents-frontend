// App imports
import { Slider } from '../utils/slider';

export const Circle = ({ marker }: any) => {
	const { id, radius } = marker;
	
	return (
		<Slider 
			markerId={id}
			markerProperty='radius'
			minBound={0} 
			maxBound={1}
			title={"Radius"}
			initialState={radius}
		/>
	)
};

Circle.displayName="Circle";