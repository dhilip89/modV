export default function updateModuleOrder({ commit, state }, { layerIndex, order }) {
  commit('updateModuleOrder', { layerIndex, order });
}
