import Vue from 'vue';

export default function setInheritFrom(state, { layerIndex, inheritFrom }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'inheritFrom', inheritFrom);
}
