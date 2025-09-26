export const getLinesLayer = (id: any, source: any) => ({
	id,
	source,
	type: "line",
	paint: {
		'line-width': [
			'interpolate',
			['linear'],
			['zoom'],
			13, ['*', ['get', 'line-width'], 1],
			16, ['*', ['get', 'line-width'], 2]
		],
	'line-color': ['get', 'line-color'],
	},
})