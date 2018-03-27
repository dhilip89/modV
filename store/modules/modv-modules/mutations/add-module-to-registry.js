import Vue from 'vue';

export default function addModuleToRegistry(state, { Module, moduleName }) {
  Vue.set(state.registry, moduleName, Module);
}
