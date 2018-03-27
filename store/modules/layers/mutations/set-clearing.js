import Vue from 'vue';

export default function setClearing(state, { layerIndex, clearing }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'clearing', clearing);
}
