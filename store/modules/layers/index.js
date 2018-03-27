import actions from './actions';
import mutations from './mutations';

const state = {
  focusedLayer: 0,
  layers: [],
};

// getters
const getters = {
  allLayers: state => state.layers,
  focusedLayerIndex: state => state.focusedLayer,
  focusedLayer: state => state.layers[state.focusedLayer],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
