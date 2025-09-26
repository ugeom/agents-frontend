// Types imports
import { ChartData, GeoJSONData, ChartGeoJSONFeature } from 'utils/types/charts';

export const processData = (data: GeoJSONData, name: string, colorLabel: string): ChartData => {
	const { distribution, colors } = data.features.reduce((total: ChartData, curr: ChartGeoJSONFeature) => {
		const key = curr.properties[name];
		if (key && typeof key === 'string') {
			total.distribution[key] = (total.distribution[key] || 0) + 1;
			const color = curr.properties[colorLabel];
			if (typeof color === 'string') {
				total.colors[key] = color;
			}
		}
		return total;
	}, { distribution: {}, colors: {} } as ChartData);

	const sortedEntries = Object.entries(distribution)
	    .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
	    .slice(0, 3);

	return sortedEntries.reduce((total: ChartData, [key, value]: [string, number]) => {
		total.distribution[key] = value;
		total.colors[key] = colors[key];
		return total;
	}, { distribution: {}, colors: {} } as ChartData);
};