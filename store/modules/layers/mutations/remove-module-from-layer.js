import Vue from 'vue';

export default function removeModuleFromLayer(state, { moduleName, layerIndex }) {
  const Layer = state.layers[layerIndex];

  const moduleIndex = Layer.moduleOrder.indexOf(moduleName);
  if (moduleIndex < 0) return;

  Layer.moduleOrder.splice(moduleIndex, 1);
  Vue.delete(Layer.modules, moduleName);
}
