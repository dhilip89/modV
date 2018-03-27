import Ajv from 'ajv/lib/ajv';
import { externalState } from '../';

const jsd4 = require('ajv/lib/refs/json-schema-draft-04.json');

const makeSchema = function makeSchema(properties) {
  return {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties,
  };
};

export default function presetData({ state }) {
  // @TODO: figure out a better clone than JSONparse(JSONstringify())
  const ajv = new Ajv({
    removeAdditional: 'all',
  });
  ajv.addMetaSchema(jsd4);


  const moduleNames = Object.keys(state.active)
    .filter(key => key.substring(key.length - 8, key.length) !== '-gallery');

  const moduleData = moduleNames.reduce((obj, moduleName) => {
    obj[moduleName] = {};
    obj[moduleName].values = JSON.parse(JSON.stringify(state.active[moduleName]));
    return obj;
  }, {});

  moduleNames.forEach((moduleName) => {
    const Module = externalState.active[moduleName];

    const moduleInfo = {
      alpha: Module.info.alpha,
      author: Module.info.author,
      compositeOperation: Module.info.compositeOperation,
      enabled: Module.info.enabled,
      originalName: Module.info.originalName,
      version: Module.info.version,
    };

    // Merge Module data onto existing data
    moduleData[moduleName] = Object.assign(moduleData[moduleName], moduleInfo);
    delete moduleData[moduleName].values.info;

    if (!('saveData' in Module.info)) {
      console.warn(`generatePreset: Module ${Module.info.name} has no saveData schema, falling back to Vuex store data`);
      return;
    }

    const schema = makeSchema(JSON.parse(JSON.stringify(Module.info.saveData)));
    const validate = ajv.compile(schema);

    const copiedModule = JSON.parse(JSON.stringify(Module));
    const validated = validate(copiedModule);
    if (!validated) {
      console.error(
        `generatePreset: Module ${Module.info.name} failed saveData validation, skipping`,
        validate.errors,
      );
      return;
    }

    // Merge validated data onto existing data
    moduleData[moduleName].values = Object.assign(moduleData[moduleName].values, copiedModule);
  });

  return moduleData;
}
