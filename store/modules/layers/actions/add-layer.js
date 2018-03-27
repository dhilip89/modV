import { Layer } from '@/modv';
import store from '@/../store';

export default function addLayer({ commit, state }) {
  return new Promise((resolve) => {
    const layerName = `Layer ${state.layers.length + 1}`;
    const layer = new Layer();
    layer.setName(layerName);

    const width = store.getters['size/width'];
    const height = store.getters['size/height'];
    let dpr = 1;
    if (store.getters['user/useRetina']) {
      dpr = window.devicePixelRatio;
    }

    layer.resize({ width, height, dpr });
    commit('addLayer', { layer });
    commit('setLayerFocus', {
      LayerIndex: state.layers.length - 1,
    });

    resolve({
      Layer: layer,
      index: state.layers.length - 1,
    });
  });
}
