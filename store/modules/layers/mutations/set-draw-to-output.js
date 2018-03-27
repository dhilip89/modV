import Vue from 'vue';

export default function setDrawToOutput(state, { layerIndex, drawToOutput }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'drawToOutput', drawToOutput);
}
