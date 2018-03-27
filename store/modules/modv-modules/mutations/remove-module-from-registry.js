import Vue from 'vue';

export default function removeModuleFromRegistry(state, { moduleName }) {
  Vue.delete(state.registry, moduleName);
}
