import Vue from 'vue';

export default function setLocked(state, { layerIndex, locked }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'locked', locked);
}
