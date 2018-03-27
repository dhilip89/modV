export default function presetData({ state }) {
  return state.layers.map((Layer) => {
    const layerData = {};
    layerData.alpha = Layer.alpha;
    layerData.blending = Layer.blending;
    layerData.clearing = Layer.clearing;
    layerData.collapsed = Layer.collapsed;
    layerData.drawToOutput = Layer.drawToOutput;
    layerData.enabled = Layer.enabled;
    layerData.inherit = Layer.inherit;
    layerData.inheritFrom = Layer.inheritFrom;
    layerData.locked = Layer.locked;
    layerData.moduleOrder = Layer.moduleOrder;
    layerData.name = Layer.name;
    layerData.pipeline = Layer.pipeline;
    return layerData;
  });
}
