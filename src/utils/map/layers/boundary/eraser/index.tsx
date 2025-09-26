export const getEraserLayer = (id: string, source: string) => ({
	id,
	source,
	type: 'clip',
	layout: {'clip-layer-types': ['symbol', 'model']},
	minzoom: 14
});