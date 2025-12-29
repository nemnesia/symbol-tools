import { createSymbolNodeWatchApi } from '../src/index.js';

const symbolNodeWatchApi = createSymbolNodeWatchApi(true);
symbolNodeWatchApi.getSymbolPeerNodes().then((response) => {
  console.log(response);
});
