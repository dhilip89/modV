import Vue from 'vue';
import { externalState } from '../';

export default function setActiveModuleEnabled(state, { moduleName, enabled }) {
  Vue.set(state.active[moduleName].info, 'enabled', enabled);
  externalState.active[moduleName].info.enabled = enabled;
}
