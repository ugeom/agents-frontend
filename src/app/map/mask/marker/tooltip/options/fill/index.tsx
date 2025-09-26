// App imports
import { Slider } from '../utils/slider';
import { Color } from '../utils/color';

export const Fill = ({ marker }: any) => {
	const { id, fillOpacity } = marker;
	
	return (
		<>
			<Slider 
				markerId={id}
				minBound={0} 
				maxBound={1} 
				markerProperty={'fillOpacity'}
				title={"Opacity"}
				initialState={fillOpacity}
			/>
			<Color 
				markerId={id}
				markerProperty={'fillColor'}
			/>
		</>
	)
}

Fill.displayName="Fill";