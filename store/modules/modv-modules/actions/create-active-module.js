import { modV } from '@/modv';
import store from '@/../store';

function generateName(state, name) {
  let dupeNo = 1;

  if (name in state.active) {
    let dupeName = `${name} (${dupeNo})`;
    while (dupeName in state.active) {
      dupeNo += 1;
      dupeName = `${name} (${dupeNo})`;
    }
    return dupeName;
  }

  return name;
}

export default function createActiveModule({ commit, state },
  { moduleName, appendToName, skipInit, enabled }) {
  return new Promise((resolve) => {
    const module = new state.registry[moduleName]();
    let newModuleName = generateName(state, module.info.name);
    module.info.name = newModuleName;
    module.info.alpha = 1;
    module.info.originalName = moduleName;
    module.info.enabled = enabled || false;
    module.info.compositeOperation = 'normal';

    const dimensions = store.getters['size/dimensions'];
    const useDpr = store.getters['user/useRetina'];

    if (useDpr) {
      dimensions.width *= window.devicePixelRatio;
      dimensions.height *= window.devicePixelRatio;
    }

    const canvas = modV.bufferCanvas;

    if ('init' in module && !skipInit) module.init(canvas);

    if ('meyda' in module.info) {
      if (Array.isArray(module.info.meyda)) {
        module.info.meyda.forEach(feature =>
          store.commit('meyda/addFeature', { feature }),
        );
      }
    }

    newModuleName = `${newModuleName}${appendToName || ''}`;

    if ('controls' in module.info) {
      Object.keys(module.info.controls).forEach((key) => {
        const control = module.info.controls[key];
        const inputId = `${newModuleName}-${control.variable}`;

        if (control.type === 'paletteControl') {
          store.dispatch('palettes/createPalette', {
            id: inputId,
            colors: control.colors || [],
            duration: control.timePeriod,
            moduleName: newModuleName,
            variable: control.variable,
          });
        }
      });
    }

    commit('addActiveModule', { module, moduleName: newModuleName });
    resolve(module);
  });
}
