import Vue from 'vue';

export default function setAlpha(state, { layerIndex, alpha }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'alpha', alpha);
}
