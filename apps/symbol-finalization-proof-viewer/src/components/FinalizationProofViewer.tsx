import { Box } from '@mui/material';
import { createSymbolNodeWatchApi } from '@nemnesia/nodewatch-openapi-provider';
import { Node } from '@nemnesia/nodewatch-openapi-typescript-fetch-client';
import { useEffect, useState } from 'react';

import '../App.css';
import ChainInfoCard from './ChainInfoCard';
import VotingNodeList from './VotingNodeList';

function FinalizationProofViewer({ networkName }: { networkName: 'mainnet' | 'testnet' }) {
  const [_height, setHeight] = useState('0');
  const [votingNodes, setVotingNodes] = useState<Node[]>([]);

  // URLからフィルターパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter');

  // urlFilterはホスト名に使用される文字のみを許可
  if (urlFilter && !/^[a-zA-Z0-9.-]*$/.test(urlFilter)) {
    return (
      <Box sx={{ margin: '0 auto', maxWidth: 1024, width: '100%' }}>
        <Box sx={{ m: 1, color: 'red' }}>
          Error: Invalid filter parameter. Only alphanumeric characters, dots, and hyphens are allowed.
        </Box>
      </Box>
    );
  }

  /**
   * Voting Nodes情報取得
   */
  useEffect(() => {
    const fetchVotingNodes = async () => {
      const isMainNet = networkName === 'mainnet';
      const symbolNodeWatchApi = createSymbolNodeWatchApi(isMainNet);
      const nodes = await symbolNodeWatchApi.getSymbolPeerNodes();
      const votingNodes: Node[] = nodes.filter((node) => (node.roles ?? 0) & 4);
      setVotingNodes(votingNodes);
      console.log('votingNodes', votingNodes);
    };

    setVotingNodes([]);
    fetchVotingNodes();
  }, [networkName]);

  return (
    <Box sx={{ margin: '0 auto', maxWidth: 1024, width: '100%' }}>
      <Box sx={{ m: 1 }}>
        <ChainInfoCard networkName={networkName} onHeightChange={setHeight} />
      </Box>

      <Box sx={{ m: 1 }}>
        <VotingNodeList votingNodes={votingNodes} urlFilter={urlFilter} networkName={networkName} />
      </Box>
    </Box>
  );
}

export default FinalizationProofViewer;
