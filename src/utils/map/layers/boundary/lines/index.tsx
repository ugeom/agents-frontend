export const getLinesLayer = (
	id: string, 
	source: string, 
	strokeColor: string, 
	strokeOpacity: number, 
	strokeWidth: number
) => ({
	id,
	source,
	type: 'line',
	paint: {
		'line-width': strokeWidth,
		'line-color': strokeColor,
		'line-opacity': strokeOpacity,
		'line-dasharray': [2, 2],
		'line-blur': 1.5,
	},
});