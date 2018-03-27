import Vue from 'vue';

export default function uncollapse(state, { layerIndex }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'collapsed', false);
}
