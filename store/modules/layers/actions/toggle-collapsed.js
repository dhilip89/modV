export default function toggleCollapsed({ commit, state }, { layerIndex }) {
  const Layer = state.layers[layerIndex];

  if (Layer.collapsed) commit('uncollapse', { layerIndex });
  else commit('collapse', { layerIndex });
}
