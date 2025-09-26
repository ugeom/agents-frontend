if (!process.env.REACT_APP_MAPBOX_TOKEN) {
    throw new Error('REACT_APP_MAPBOX_TOKEN is required');
}

export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;