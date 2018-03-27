export default function toggleLocked({ commit, state }, { layerIndex }) {
  const Layer = state.layers[layerIndex];

  if (Layer.locked) commit('unlock', { layerIndex });
  else commit('lock', { layerIndex });
}
