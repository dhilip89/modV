import Vue from 'vue';
import { externalState } from '../';

export default function setActiveModuleControlValue(state, {
  moduleName,
  variable,
  value,
  processedValue,
}) {
  Vue.set(state.active[moduleName], variable, value);
  externalState.active[moduleName][variable] = processedValue;
}
