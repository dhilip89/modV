import Vue from 'vue';

export default function setPipeline(state, { layerIndex, pipeline }) {
  const Layer = state.layers[layerIndex];
  Vue.set(Layer, 'pipeline', pipeline);
}
