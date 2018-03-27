import Vue from 'vue';
import { externalState } from '../';

export default function addActiveModule(state, { module, moduleName }) {
  const values = {};

  Object.keys(module.info.controls).forEach((controlVariableName) => {
    values[controlVariableName] = module[controlVariableName];
  });

  Vue.set(state.active, moduleName, values);
  Vue.set(state.active[moduleName], 'info', {});
  externalState.active[moduleName] = module;
}
