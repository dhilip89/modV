import Vue from 'vue';

export default function collapse(state, { layerIndex }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'collapsed', true);
}
