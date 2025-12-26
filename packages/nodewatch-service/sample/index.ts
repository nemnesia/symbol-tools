import { createSymbolNodesApi } from '../src/index.js';

const symbolNodesApi = createSymbolNodesApi(true);
symbolNodesApi.getSymbolPeerNodes().then((response) => {
  console.log(response);
});
