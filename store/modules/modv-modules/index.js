import actions from './actions';
import mutations from './mutations';

const externalState = {
  active: {},
};

window.externalState = externalState;

const state = {
  active: {},
  registry: {},
  focusedModule: null,
  currentDragged: null,
};

// getters
const getters = {
  registry: state => state.registry,
  activeModules: state => state.active,
  focusedModule: state => externalState.active[state.focusedModule],
  focusedModuleName: state => state.focusedModule,
  getActiveModule: () => moduleName => externalState.active[moduleName],
  currentDragged: state => state.currentDragged,
  getValueFromActiveModule: state => (moduleName, controlVariable) => {
    const module = externalState.active[moduleName];
    let processed = externalState.active[moduleName][controlVariable];

    if ('append' in module.info.controls[controlVariable]) {
      processed = processed.replace(module.info.controls[controlVariable].append, '');
    }

    return {
      raw: state.active[moduleName][controlVariable],
      processed,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export {
  externalState,
};
