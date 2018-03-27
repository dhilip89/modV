import Vue from 'vue';

export default function addModuleInstanceToLayer(state, {
  moduleName,
  moduleInstance,
  layerIndex,
}) {
  Vue.set(state.layers[layerIndex].modules, moduleName, moduleInstance);
}
