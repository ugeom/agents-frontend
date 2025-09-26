export const getFillLayer = (
	id: string, 
	source: string, 
	fillColor: string, 
	fillOpacity: number
) => ({
	id,
	source,
	type: 'fill',
	paint: {
		"fill-color": fillColor,
		"fill-opacity": fillOpacity
	}
});