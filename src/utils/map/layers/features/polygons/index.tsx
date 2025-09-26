export const getPolygonLayer = (id: any, source: any) => ({
	id,
	source,
	type: "fill-extrusion",
	paint: {
		"fill-extrusion-color": ["get", "fill-color"],
		'fill-extrusion-height': ['coalesce', ['get', 'height'], 10],
		'fill-extrusion-base': 0,
		"fill-extrusion-vertical-gradient": true,
		"fill-extrusion-opacity": 0.6,
	},
})