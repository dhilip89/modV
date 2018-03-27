export default function moveModuleInstance({ commit, state }, {
  fromLayerIndex,
  toLayerIndex,
  moduleName,
}) {
  const moduleInstance = state.layers[fromLayerIndex].modules[moduleName];

  commit('addModuleInstanceToLayer', { moduleName, moduleInstance, layerIndex: toLayerIndex });
  commit('removeModuleInstanceFromLayer', { moduleName, layerIndex: fromLayerIndex });
}
