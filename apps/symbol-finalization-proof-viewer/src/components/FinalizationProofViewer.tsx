import { Box } from '@mui/material';
import { createSymbolNodeWatchApi } from '@nemnesia/nodewatch-openapi-provider';
import { Node } from '@nemnesia/nodewatch-openapi-typescript-fetch-client';
import { useEffect, useState } from 'react';

import '../App.css';
import ChainInfoCard from './ChainInfoCard';
import VotingNodeList from './VotingNodeList';

const PASOMI_NODE_INFO_URL = 'https://pasomi.net:3001/node/info';

const fetchPasomiMainnetNode = async (): Promise<Node | null> => {
  try {
    const response = await fetch(PASOMI_NODE_INFO_URL);
    if (!response.ok) {
      return null;
    }

    const nodeInfo = (await response.json()) as {
      publicKey?: string;
      nodePublicKey?: string;
      host?: string;
      port?: number;
      friendlyName?: string;
      version?: number;
      roles?: number;
    };

    if (!nodeInfo.publicKey || !nodeInfo.host || !nodeInfo.port) {
      return null;
    }

    return {
      mainPublicKey: nodeInfo.publicKey,
      nodePublicKey: nodeInfo.nodePublicKey,
      endpoint: `http://${nodeInfo.host}:${nodeInfo.port}`,
      name: nodeInfo.friendlyName ?? nodeInfo.host,
      version: String(nodeInfo.version ?? ''),
      height: 0,
      finalizedHeight: 0,
      balance: 0,
      roles: nodeInfo.roles,
    };
  } catch {
    return null;
  }
};

function FinalizationProofViewer({ networkName }: { networkName: 'mainnet' | 'testnet' }) {
  const [, setHeight] = useState('0');
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
      try {
        const isMainNet = networkName === 'mainnet';
        const symbolNodeWatchApi = createSymbolNodeWatchApi(isMainNet);
        const nodes = await symbolNodeWatchApi.getSymbolPeerNodes();
        let votingNodes: Node[] = nodes.filter((node) => (node.roles ?? 0) & 4);

        if (isMainNet) {
          const hasPasomi = votingNodes.some((node) => {
            try {
              return new URL(node.endpoint).hostname === 'pasomi.net';
            } catch {
              try {
                return new URL(`http://${node.endpoint}`).hostname === 'pasomi.net';
              } catch {
                return false;
              }
            }
          });

          if (!hasPasomi) {
            const pasomiNode = await fetchPasomiMainnetNode();
            if (pasomiNode && (pasomiNode.roles ?? 0) & 4) {
              votingNodes = [...votingNodes, pasomiNode];
            }
          }
        }

        setVotingNodes(votingNodes);
      } catch {
        setVotingNodes([]);
      }
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
