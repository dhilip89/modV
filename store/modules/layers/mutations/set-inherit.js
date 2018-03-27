import Vue from 'vue';

export default function setInherit(state, { layerIndex, inherit }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'inherit', inherit);
}
