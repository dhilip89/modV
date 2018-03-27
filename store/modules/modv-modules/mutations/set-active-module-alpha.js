import Vue from 'vue';
import { externalState } from '../';

export default function setActiveModuleAlpha(state, { moduleName, alpha }) {
  Vue.set(state.active[moduleName].info, 'alpha', alpha);
  externalState.active[moduleName].info.alpha = alpha;
}
