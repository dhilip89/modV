export default function removeLayer(state, { layerIndex }) {
  state.layers.splice(layerIndex, 1);
}
