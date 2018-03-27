import Vue from 'vue';

export default function setEnabled(state, { layerIndex, enabled }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'enabled', enabled);
}
