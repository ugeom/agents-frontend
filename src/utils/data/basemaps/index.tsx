export const basemapDefinitions = {
	mapbox_light: {
		name: "Mapbox Light",
		url: "mapbox://styles/mapbox/light-v11",
		img: "light"
	},
	positron: {
		name: "Positron",
		url: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
		img: "positron"
	},
	mapbox_dark: {
		name: "Mapbox Dark",
		url: "mapbox://styles/mapbox/dark-v11",
		img: "dark"
	},
	satellite_streets: {
		name: "Satellite Streets",
		url: "mapbox://styles/mapbox/satellite-streets-v12",
		img: "satellite"
	},
	voyager: {
		name: "Voyager",
		url: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
		img: "voyager"
	},
	custom: {
		name: "Custom",
		url: "mapbox://styles/hvoking/cm16kxow500ez01pc3psqc4pv",
		img: "custom"
	}
};

export const basemaps = [
	'mapbox_light',
	'positron', 
	'mapbox_dark',
	'satellite_streets',
	'voyager',
	'custom'
];


export const listOfBaseMaps = [
	{
		"provider": "light",
		"mapas": {
			"Positron": "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
			"Mapbox Light": "mapbox://styles/mapbox/light-v11",
			
		}
	},
	{
		"provider": "satellite",
		"mapas": {
			"Satellite": "mapbox://styles/mapbox/satellite-streets-v12",
			"Mapbox Dark": "mapbox://styles/mapbox/dark-v10",
		}
	},
	{
		"provider": "color",
		"mapas": {
			"Voyager": "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
			"Custom": "mapbox://styles/hvoking/cm16kxow500ez01pc3psqc4pv",
		}
	},
]