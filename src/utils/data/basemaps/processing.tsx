import { basemapDefinitions } from './index';

interface BasemapData {
    name: string;
    url: string;
    img: string;
}

export const processBasemapItem = (basemapId: string): BasemapData & { imageUrl: string; altText: string } => {
    const data = basemapDefinitions[basemapId as keyof typeof basemapDefinitions];
    if (!data) {
        throw new Error(`Basemap with id "${basemapId}" not found`);
    }
    
    const { name, url, img } = data;
    const imageUrl = process.env.PUBLIC_URL + `/static/basemaps/${img}.png`;
    
    return {
        name,
        url,
        img,
        imageUrl,
        altText: `${basemapId}-${img}`
    };
};