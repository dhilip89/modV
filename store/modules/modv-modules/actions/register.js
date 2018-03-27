export default function register({ commit, state }, { Module }) {
  const instantiated = new Module();
  const moduleName = instantiated.info.name;
  commit('addModuleToRegistry', { Module, moduleName });
}
