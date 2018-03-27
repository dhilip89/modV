import Vue from 'vue';

export default function unlock(state, { layerIndex }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'locked', false);
}
