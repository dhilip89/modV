export default function addModuleToLayer(state, { moduleName, layerIndex, position }) {
  const Layer = state.layers[layerIndex];
  if (Layer.locked) return;

  if (!Layer) {
    throw new Error(`Cannot find Layer with index ${layerIndex}`);
  } else {
    Layer.addModule(moduleName, position);
  }
}
