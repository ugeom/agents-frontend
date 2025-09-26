// Road color constants shared across the application
export const ROAD_COLORS = {
  trunk: 'rgba(247, 121, 118, 0.8)',
  primary: 'rgba(250, 189, 74, 0.8)',
  secondary: 'rgba(255, 232, 8, 0.8)',
  tertiary: 'rgba(50, 205, 50, 0.8)',
  street: 'rgba(123, 210, 223, 0.8)',
  service: 'rgba(180, 180, 180, 0.8)',
  path: 'rgba(210, 180, 140, 0.8)'
} as const;

export const getRoadColor = (roadType: string): string => {
  return ROAD_COLORS[roadType as keyof typeof ROAD_COLORS] || ROAD_COLORS.street;
};

export const ROAD_LAYER_IDS = ['roads-within-boundary', 'roads-all'] as const;