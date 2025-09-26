// Types imports
import { ProviderType } from 'utils/types/markers';

export const processProviderItem = (item: ProviderType) => {
    const name = item.name;
    const baseUrl = process.env.PUBLIC_URL + '/static/agents/';
    const url = baseUrl + name + '.svg';
    const processedName = name.replace("_", " ");
    
    return {
        name,
        url,
        processedName,
        item
    };
};