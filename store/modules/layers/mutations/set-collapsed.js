import Vue from 'vue';

export default function setCollapsed(state, { layerIndex, collapsed }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'collapsed', collapsed);
}
