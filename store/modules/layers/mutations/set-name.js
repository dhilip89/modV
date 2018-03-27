export default function setName(state, { layerIndex, name }) {
  state.layers[layerIndex].setName(name);
}
