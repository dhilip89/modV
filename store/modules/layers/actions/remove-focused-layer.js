import store from '@/../store';

export default function removeFocusedLayer({ commit, state }) {
  const Layer = state.layers[state.focusedLayer];
  Object.keys(Layer.modules).forEach((moduleName) => {
    store.dispatch(
      'modVModules/removeActiveModule',
      { moduleName },
    );
  });
  commit('removeLayer', { layerIndex: state.focusedLayer });
  if (state.focusedLayer > 0) commit('setLayerFocus', { LayerIndex: state.focusedLayer - 1 });
}
