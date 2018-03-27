import Vue from 'vue';

export default function setBlending(state, { layerIndex, blending }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'blending', blending);
}
