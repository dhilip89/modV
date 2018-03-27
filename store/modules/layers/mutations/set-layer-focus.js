import Vue from 'vue';

export default function setLayerFocus(state, { LayerIndex }) {
  Vue.set(state, 'focusedLayer', LayerIndex);
}
