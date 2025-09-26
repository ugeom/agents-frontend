// App imports
import { useState } from 'react';

// App imports
import { Gauge } from './gauge';
import { Dots } from './dots';
import { Lines } from './lines';
import { Bars } from './bars';
import { processData } from './data';
import './styles.scss';

// Third-party imports
import * as d3 from 'd3';

export const Charts = ({ data, name, colorLabel, backgroundColor }: any) => {
	const [ graphictTypeIndex, setGraphicTypeIndex ] = useState(0);

	const { distribution, colors } = processData(data, name, colorLabel);
	const sumOfValues = d3.sum(Object.values(distribution));

	const graphicTypeArray = ["dots", "gauge", "lines"];
	const graphicType = graphicTypeArray[graphictTypeIndex];

	const onClick = () => {
		setGraphicTypeIndex((prev: any) => {
			if (prev < 2) return prev + 1;
			return 0;
		})
	}

	return (
			<div className="chart-wrapper" style={{backgroundColor: backgroundColor}} onClick={onClick}>
				<Bars distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>
				{graphicType === "gauge" && <Gauge distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>}
				{graphicType === "dots" && <Dots distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>}
				{graphicType === "lines" && <Lines distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>}
			</div>
	)
}

Charts.displayName="Charts";