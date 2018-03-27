import store from '@/../store';

export default function addModuleToLayer({ commit, state }, { module, layerIndex, position }) {
  let positionShadow = position;
  if (typeof positionShadow !== 'number') {
    if (positionShadow < 0) {
      positionShadow = 0;
    }
  }
  commit('addModuleToLayer', { moduleName: module.info.name, layerIndex, position: positionShadow });
  store.commit(
    'modVModules/setModuleFocus',
    { activeModuleName: module.info.name },
    { root: true },
  );
}
