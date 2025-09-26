const getLayersIdsBySourceLayer = (currentMap: any, sourceLayer: string) =>
  currentMap.getStyle().layers
    .filter((layer: any) =>
      layer['source-layer'] === 'default'
        ? layer['source'] === sourceLayer
        : layer['source-layer'] === sourceLayer
    )
    .map((layer: any) => layer.id);


export const getFeaturesBySource = (currentMap: any, currentSource: any) => {
  const layers = getLayersIdsBySourceLayer(currentMap, currentSource);
  const currentFeatures = currentMap.queryRenderedFeatures({ layers });
  return currentFeatures;
}