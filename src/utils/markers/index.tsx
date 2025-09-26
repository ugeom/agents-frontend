// Types imports
import { MarkerType } from 'utils/types/markers';

/**
 * Generates a new unique marker ID based on existing markers
 * @param markerCollection - Record of existing markers
 * @returns New unique marker ID
 */
export const generateMarkerId = (markerCollection: Record<string, MarkerType>): number => {
    const prevIds = Object.keys(markerCollection).map(Number);
    const maxId = prevIds.length ? Math.max(...prevIds) : 0;
    return maxId + 1;
};