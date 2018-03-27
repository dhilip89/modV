import Vue from 'vue';

export default function updateModuleOrder(state, { layerIndex, order }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'moduleOrder', order);
}
