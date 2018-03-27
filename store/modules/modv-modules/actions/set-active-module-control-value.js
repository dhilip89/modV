import { modV } from '@/modv';
import { externalState } from '../';

export default function setActiveModuleControlValue({ commit, state }, {
  moduleName,
  variable,
  value,
}) {
  const module = externalState.active[moduleName];
  const controlValues = state.active[moduleName];
  let processedValue = value;

  modV.plugins.filter(plugin => ('processValue' in plugin)).forEach((plugin) => {
    processedValue = plugin.processValue({
      currentValue: value,
      controlVariable: variable,
      moduleName,
    });
  });

  if (
    Object.keys(controlValues)
      .filter(controlVariableName => controlVariableName === variable).length < 1
    ) {
    return;
  }

  if ('append' in module.info.controls[variable]) {
    processedValue = `${processedValue}${module.info.controls[variable].append}`;
  }

  commit('setActiveModuleControlValue', {
    moduleName,
    variable,
    value,
    processedValue,
  });
}
