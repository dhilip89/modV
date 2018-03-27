import Vue from 'vue';

export default function setModuleOrder(state, { layerIndex, moduleOrder }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'moduleOrder', moduleOrder);
}
