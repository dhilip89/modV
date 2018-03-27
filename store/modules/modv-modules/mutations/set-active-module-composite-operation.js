import Vue from 'vue';
import { externalState } from '../';

export default function setActiveModuleCompositeOperation(state, {
  moduleName,
  compositeOperation,
}) {
  Vue.set(state.active[moduleName].info, 'compositeOperation', compositeOperation);
  externalState.active[moduleName].info.compositeOperation = compositeOperation;
}
