export const processData = (data: any, name: any) => {
	const { distribution } = data.features.reduce((total: any, curr: any) => {
		const key = curr[name];
		if (key) {
			total.distribution[key] = (total.distribution[key] || 0) + 1;
		}
		return total;
	}, { distribution: {} });
	return distribution
};