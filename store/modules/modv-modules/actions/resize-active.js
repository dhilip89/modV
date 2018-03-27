import { modV } from '@/modv';
import { externalState } from '../';

export default function resizeActive({ state }) {
  const canvas = modV.bufferCanvas;
  Object.keys(state.active).forEach((moduleName) => {
    let module;

    if (moduleName.indexOf('-gallery') > -1) return;

    if (moduleName in externalState.active) {
      module = externalState.active[moduleName];
    } else {
      return;
    }

    if ('resize' in module) {
      module.resize(canvas);
    }
  });
}
