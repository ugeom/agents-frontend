// React imports

// App imports
import { Gauge } from './gauge';
import { Bars } from './bars';
import './styles.scss';

// Utils imports
import { processData } from 'utils/data/charts';

// Third-party imports
import * as d3 from 'd3';

export const Charts = ({ data, name, colorLabel }: any) => {
	const { distribution, colors } = processData(data, name, colorLabel);
	const sumOfValues = d3.sum(Object.values(distribution));

	return (
			<div className="chart-wrapper">
				<Bars distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>
				<Gauge distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>
			</div>
	)
}

Charts.displayName="Charts";