import store from '@/../store';
import { externalState } from '../';

export default function removeActiveModule({ commit, state }, { moduleName }) {
  const Module = externalState.active[moduleName];

  store.commit('controlPanels/unpinPanel', { moduleName });

  if (state.focusedModule === moduleName) {
    commit('setModuleFocus', { activeModuleName: null });
  }

  if ('controls' in Module.info) {
    Object.keys(Module.info.controls).forEach((key) => {
      const control = Module.info.controls[key];
      const inputId = `${moduleName}-${control.variable}`;

      if (control.type === 'paletteControl') {
        store.dispatch('palettes/removePalette', {
          id: inputId,
        });
      }
    });
  }

  commit('removeActiveModule', { moduleName });
}
