// App imports
import { useState } from 'react';

// App imports
import { SVGWrapper } from 'utils/ui/svg';
import { Circle } from './circle';

// Third party imports
import * as d3 from "d3";

export const Gauge = ({ distribution, colors, sumOfValues }: any) => {
	const [width, setWidth] = useState<number | null>(null);
	const [height, setHeight] = useState<number | null>(null);

	const margin = { top: 0, bottom: 0, left: 0, right: 0 };

	const innerWidth: any = (width ?? 0) - margin.left - margin.right;
	const innerHeight: any = (height ?? 0) - margin.top - margin.bottom;
	
	const radius = d3.min([innerWidth, innerHeight]) / 2;
	const strokeWidth = radius * 0.3;
	const innerRadius = radius - ( strokeWidth / 2 );
	const circumference = innerRadius * 2 * Math.PI;

	let totalCircumference = 0;

	return (
		<SVGWrapper
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            margin={margin}
        >
			{Object.entries(distribution).map(([key, value]: any) => {
				const currentPercent = value / sumOfValues;
				const currentCircumference = Math.round(circumference * currentPercent);

				if (currentCircumference) {totalCircumference += currentCircumference}

				return (
					<g key={key}>
						{currentCircumference && 
							<Circle
								cx={innerWidth / 2}
								cy={innerHeight / 2}
								innerRadius={innerRadius}
								strokeWidth={strokeWidth}
								currentCircumference={currentCircumference}
								circumference={circumference}
								totalCircumference={totalCircumference}
								stroke={colors[key]}
							/>
						 }
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Gauge.displayName="Gauge";