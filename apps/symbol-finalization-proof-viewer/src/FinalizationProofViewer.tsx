import { Box, Card, CardContent, Grid, LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import { createSymbolNodeWatchApi } from '@nemnesia/nodewatch-openapi-provider';
import { Node } from '@nemnesia/nodewatch-openapi-typescript-fetch-client';
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';
import { useEffect, useState } from 'react';

import './App.css';
import ChainInfoCard from './ChainInfoCard';
import { hexToBase32 } from './utils/hexToBase32';
import { formatStringNumber, formatXymString } from './utils/numberFormat';
import { findAccountByPublicKey, findChainInfo, findFinalizationProofAtEpoch } from './utils/restClient';

const networkName: string = 'testnet';
const NETWORK_TYPE: string = 'testnet';

type VotingNodeInfoData = {
  host: string;
  publicKey: string;
  address: string;
  amount: string;
  votingPublicKeys?: {
    votingPublicKey?: string;
    startEpoch?: number;
    endEpoch?: number;
    progress?: number;
    stage0Signature?: string;
    stage1Signature?: string;
  }[];
};

const LinearProgressExt = (props: LinearProgressProps & { value: number }) => {
  let color: 'success' | 'warning' | 'error' = 'success';
  if (props.value < 85) {
    // 85%未満
    color = 'success';
  } else if (props.value <= 99) {
    // 85%以上、99%以下
    color = 'warning';
  } else {
    // 100%
    color = 'error';
  }

  return <LinearProgress variant="determinate" color={color} style={{ clear: 'both' }} value={props.value} />;
};

const judgmentVotingKey = (currentEpoch: number, startEpoch: number, endEpoch: number) => {
  if (currentEpoch < startEpoch) {
    return 'Next';
  } else if (currentEpoch > endEpoch) {
    return 'Expired';
  }
  return 'Current';
};

const GridItem = (props: { title: string; value: string }) => {
  return (
    <>
      <Typography component="div" sx={{ color: 'text.secondary', fontSize: 14 }}>
        {props.title}
      </Typography>
      <Typography
        variant="body1"
        component="div"
        gutterBottom
        style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}
      >
        {props.value}
      </Typography>
    </>
  );
};

function FinalizationProofViewer() {
  const [height, setHeight] = useState('0');
  const [finalizationEpoch, setFinalizationEpoch] = useState('0');
  const [votingNodeInfos, setVotingNodeInfos] = useState<VotingNodeInfoData[]>([]);
  const [stage0Height, setStage0Height] = useState('0');
  const [stage1Height, setStage1Height] = useState('0');

  // URLからパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter');

  // const network = NETWORK_TYPE === 'testnet' ? Network.TESTNET : Network.MAINNET;
  const [votingNodes, setVotingNodes] = useState<Node[]>([]);

  useEffect(() => {
    const retchData = async () => {
      console.info('network type:', NETWORK_TYPE);

      // フィルタ(エンドポイント or メイン公開鍵)に一致するノードのみ抽出
      let filteredVotingNodes = votingNodes;
      if (urlFilter) {
        filteredVotingNodes = votingNodes.filter((val) => {
          return val.endpoint.includes(urlFilter) || val.mainPublicKey.includes(urlFilter);
        });
      }

      // ブロック高情報取得
      const chainInfo = await findChainInfo(networkName);
      const epoch = chainInfo.latestFinalizedBlock.finalizationEpoch;

      // ファイナライゼーションプルーフは1回だけ取得
      const finalizationProof = await findFinalizationProofAtEpoch(epoch, networkName);

      // 各ノードの情報を並列取得
      const votingNodeInfoDatas: VotingNodeInfoData[] = await Promise.all(
        filteredVotingNodes.map(async (votingNode) => {
          const votingNodeInfoData: VotingNodeInfoData = {
            host: votingNode.endpoint,
            publicKey: votingNode.mainPublicKey,
            address: '-',
            amount: '0 XYM',
            votingPublicKeys: [],
          };

          // アカウント情報検索
          const accountInfo = await findAccountByPublicKey(votingNode.mainPublicKey, networkName);
          if (!accountInfo) {
            return votingNodeInfoData;
          }

          // アドレスBase32変換
          votingNodeInfoData.address = hexToBase32(accountInfo.account.address);

          // アカウント残高取得
          if (accountInfo.account.mosaics!.length !== 0) {
            const amount = formatXymString(accountInfo.account.mosaics![0].amount) + ' XYM';
            votingNodeInfoData.amount = amount;
          }

          // ファイナライゼーションプルーフの署名取得
          const votingPublicKeys = accountInfo.account.supplementalPublicKeys?.voting?.publicKeys;
          if (!votingPublicKeys || votingPublicKeys.length === 0) {
            return votingNodeInfoData;
          }

          votingNodeInfoData.votingPublicKeys = votingPublicKeys.map((votingPublicKey) => {
            let progress = 0;
            if (epoch < votingPublicKey.startEpoch) {
              // 未開始
            } else if (epoch >= votingPublicKey.endEpoch) {
              // 終了
              progress = 100;
            } else {
              // 進行中
              progress =
                ((epoch - votingPublicKey.startEpoch) / (votingPublicKey.endEpoch - votingPublicKey.startEpoch)) * 100;
            }

            // 投票してるか確認
            const signatureMap = new Map<string, string>();
            signatureMap.set('stage0', '-');
            signatureMap.set('stage1', '-');
            for (const messageGroup of finalizationProof.messageGroups) {
              const signature = messageGroup.signatures.find((val) => {
                return val.root.parentPublicKey === votingPublicKey.publicKey;
              });
              if (signature) {
                signatureMap.set(`stage${messageGroup.stage}`, signature.bottom.signature);
              }
            }

            return {
              votingPublicKey: votingPublicKey.publicKey,
              startEpoch: votingPublicKey.startEpoch,
              endEpoch: votingPublicKey.endEpoch,
              progress: progress,
              stage0Signature: signatureMap.get('stage0'),
              stage1Signature: signatureMap.get('stage1'),
            };
          });

          // ソート
          votingNodeInfoData.votingPublicKeys.sort((a, b) => {
            const isAInRange = epoch >= a.startEpoch! && epoch <= a.endEpoch!;
            const isBInRange = epoch >= b.startEpoch! && epoch <= b.endEpoch!;

            if (isAInRange && !isBInRange) {
              return -1; // aを先に
            } else if (!isAInRange && isBInRange) {
              return 1; // bを先に
            } else {
              return b.startEpoch! - a.startEpoch!; // startEpochの降順
            }
          });

          return votingNodeInfoData;
        })
      );

      votingNodeInfoDatas.sort((a, b) => {
        // votingPublicKeysが空のデータを一番下にする
        if (a.votingPublicKeys!.length === 0 && b.votingPublicKeys!.length > 0) {
          return 1;
        } else if (a.votingPublicKeys!.length > 0 && b.votingPublicKeys!.length === 0) {
          return -1;
        }

        // votingPublicKeysが空でない場合は、amountでソート
        return parseInt(b.amount) - parseInt(a.amount);
      });

      // Stateにセット
      setHeight(formatStringNumber(chainInfo.height));
      setFinalizationEpoch(formatStringNumber(chainInfo.latestFinalizedBlock.finalizationEpoch.toString()));
      // const finalizationPoint = chainInfo.latestFinalizedBlock.finalizationPoint;
      // const finalizationEpochProgress = (finalizationPoint / 72) * 100;
      setVotingNodeInfos(votingNodeInfoDatas);
      setStage0Height(formatStringNumber(stage0Height));
      setStage1Height(formatStringNumber(stage1Height));
    };

    retchData();
  }, [votingNodes]);

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

    if (votingNodes.length !== 0) return;
    fetchVotingNodes();
  }, [height]);

  return (
    <>
      <Box sx={{ m: 1 }}>
        <ChainInfoCard networkName={networkName} onHeightChange={setHeight} />
      </Box>

      <br />

      {votingNodeInfos.map((votingNodeInfo, index) => (
        <Card variant="outlined" sx={{ minWidth: 275 }} style={{ marginBottom: '10px' }} key={index}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 18, fontWeight: 'bold' }}>
              Node Info
            </Typography>

            <Grid container spacing={0.5}>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <GridItem title="Host" value={votingNodeInfo.host} />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <GridItem title="PublicKey" value={votingNodeInfo.publicKey} />
              </Grid>

              <Grid size={{ xs: 12, sm: 7, md: 9 }}>
                <GridItem title="Address" value={votingNodeInfo.address} />
              </Grid>

              <Grid size={{ xs: 12, sm: 5, md: 3 }}>
                <GridItem title="Amount" value={votingNodeInfo.amount} />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Card sx={{ minWidth: 275 }} style={{ marginTop: '10px' }} key={index}>
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'bold' }}>
                      Voting Key Info
                    </Typography>

                    {votingNodeInfo.votingPublicKeys?.map((val, index) => (
                      <Card variant="outlined" sx={{ minWidth: 275 }} style={{ marginBottom: '10px' }} key={index}>
                        <CardContent>
                          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'bold' }}>
                            {judgmentVotingKey(
                              parseInt(finalizationEpoch.replace(/,/g, '')),
                              val.startEpoch!,
                              val.endEpoch!
                            )}{' '}
                            Voting Key
                          </Typography>

                          <Grid container spacing={0.5}>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                              <GridItem title="Voting PublicKey" value={val.votingPublicKey!} />
                              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Typography component="div" sx={{ color: 'text.secondary', fontSize: 14 }}>
                                  Voting Key Period
                                </Typography>
                                <Typography
                                  variant="body1"
                                  component="div"
                                  gutterBottom
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflowX: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  <div style={{ float: 'left' }}>{formatStringNumber(val.startEpoch!.toString())}</div>
                                  <div style={{ float: 'right' }}>{formatStringNumber(val.endEpoch!.toString())}</div>
                                  <LinearProgressExt value={val.progress!} />
                                </Typography>
                              </Grid>
                            </Grid>

                            {index === 0 ? (
                              <>
                                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                  <GridItem
                                    title={`Stage0 Bottom Signature (Height: ${stage0Height})`}
                                    value={val.stage0Signature!}
                                  />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                  <GridItem
                                    title={`Stage1 Bottom Signature (Height: ${stage1Height})`}
                                    value={val.stage1Signature!}
                                  />
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default FinalizationProofViewer;
