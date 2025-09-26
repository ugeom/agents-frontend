export const getPointsLayer = (id: any, source: any) => ({
    id,
    source,
    type: "circle",
    paint: {
      'circle-radius': 3,
      'circle-color': ['get', 'circle-color']
    }
})