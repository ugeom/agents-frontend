export const processData = (data: any, name: any, colorLabel: any) => {
	const { distribution, colors } = data.features.reduce((total: any, curr: any) => {
		const key = curr.properties[name];
		if (key) {
			total.distribution[key] = (total.distribution[key] || 0) + 1;
			total.colors[key] = curr.properties[colorLabel];
		}
		return total;
	}, { distribution: {}, colors: {} });

	const sortedEntries = Object.entries(distribution)
	    .sort(([, a]: any, [, b]: any) => b - a)
	    .slice(0, 3);

	return sortedEntries.reduce((total: any, [key, value]: any) => {
		total.distribution[key] = value;
		total.colors[key] = colors[key];
		return total;
	}, { distribution: {}, colors: {} });
};