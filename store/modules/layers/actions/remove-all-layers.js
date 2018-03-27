import store from '@/../store';

export default function removeAllLayers({ commit, state }) {
  state.layers.forEach((Layer, layerIndex) => {
    Object.keys(Layer.modules).forEach((moduleName) => {
      console.log('Should remove', moduleName);
      store.dispatch(
        'modVModules/removeActiveModule',
        { moduleName },
      );
    });

    commit('removeLayer', { layerIndex });
  });
}
