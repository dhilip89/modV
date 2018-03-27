import Vue from 'vue';
import { externalState } from '../';

export default function removeActiveModule(state, { moduleName }) {
  Vue.delete(state.active, moduleName);
  delete externalState.active[moduleName];
}
