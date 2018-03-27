export default function resize({ commit, state }, { width, height, dpr }) {
  state.layers.forEach((Layer) => {
    Layer.resize({ width, height, dpr });
  });
}
