// React imports
import { useState } from 'react';

// App imports
import { SVGWrapper } from 'utils/ui/svg';
import { createColorScale } from 'utils/ui/color';
import { Wrapper } from './wrapper';
import './styles.scss';

export const Color = ({ markerId, markerProperty }: any) => {
	const [width, setWidth] = useState<number | null>(null);
	const [height, setHeight] = useState<number | null>(null);

	const margin = { top: 0, bottom: 0, left: 0, right: 0 };

	const innerWidth: any = (width ?? 0) - margin.left - margin.right;
	const innerHeight: any = (height ?? 0) - margin.top - margin.bottom;

	const colorScale = createColorScale();

	return (
		<div className="colors-wrapper">
			<SVGWrapper
	            width={width}
	            height={height}
	            setWidth={setWidth}
	            setHeight={setHeight}
	            margin={margin}
	        >
				<Wrapper
					markerId={markerId}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					colorScale={colorScale}
					markerProperty={markerProperty}
				/>
			</SVGWrapper>
		</div>
	)
}

Color.displayName="Color";