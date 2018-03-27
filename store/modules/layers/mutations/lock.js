import Vue from 'vue';

export default function lock(state, { layerIndex }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'locked', true);
}
