import { Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import { Network } from '@nemnesia/symbol-catbuffer/symbol';
import {
  BlockInfoDTO,
  BlockRoutesApi,
  ChainRoutesApi,
  Configuration,
  FinalizedBlockDTO,
} from '@nemnesia/symbol-openapi-typescript-fetch-client';
import { SymbolWebSocketMonitor } from '@nemnesia/symbol-websocket';
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';
import { useEffect, useRef, useState } from 'react';

import { formatStringNumber } from './utils/numberFormat';

type ChainInfoCardProps = {
  networkName: string;
  onHeightChange?: (height: string) => void; // ブロック高が更新されたときに親へ通知
};

const ChainInfoCard: React.FC<ChainInfoCardProps> = ({ networkName, onHeightChange }) => {
  // チェーン情報の状態管理
  const [height, setHeight] = useState('0'); // 最新ブロック高
  const [finalizedHeight, setFinalizedHeight] = useState('0'); // ファイナライズされたブロック高
  const [finalizationPoint, setFinalizationPoint] = useState('0'); // ファイナライゼーションポイント
  const [finalizationEpoch, setFinalizationEpoch] = useState('0'); // ファイナライゼーションエポック

  // ブロック生成の進捗状態（0-100のパーセンテージ、60秒で100%）
  const [blockGenerationElapsedTime, setBlockGenerationElapsedTime] = useState(0);
  // 最後に受信したブロックのタイムスタンプ（経過時間計算用）
  const lastBlockTimestampRef = useRef<Date | null>(null);

  useEffect(() => {
    const network = networkName === 'mainnet' ? Network.MAINNET : Network.TESTNET;

    let intervalId: NodeJS.Timeout;

    /**
     * 経過時間をプログレスバーのパーセンテージに変換
     * @param diffMs ミリ秒単位の経過時間
     * @returns 0-100の範囲のパーセンテージ（60秒で100%）
     */
    const calculateProgressPercent = (diffMs: number) => diffMs / 600;

    /**
     * ブロック生成の進捗状態を更新
     * 受信したブロック情報から経過時間を計算し、プログレスバーの値を更新
     */
    const updateBlockProgress = (blockInfo: BlockInfoDTO) => {
      const now = new Date();
      const blockTimestamp = network.datetimeConverter.toDatetime(Number(blockInfo.block.timestamp));
      lastBlockTimestampRef.current = blockTimestamp;
      const diffMs = now.getTime() - blockTimestamp.getTime();
      setBlockGenerationElapsedTime(calculateProgressPercent(diffMs));
    };

    /**
     * チェーン情報の初期取得とWebSocket接続の確立
     * - ノードの選択と接続
     * - REST APIからの初期チェーン情報取得
     * - WebSocketによるリアルタイム更新の購読
     */
    const fetchData = async () => {
      // 利用可能なSymbolノードを取得
      const symbolNodes = await nemSymbolNodePicker({
        chainName: 'symbol',
        network: networkName,
        count: 1,
        isSsl: true,
      });

      // WebSocket接続を確立してリアルタイム更新を受信
      console.log('Connecting to websocket node:', new URL(symbolNodes[0]).hostname);
      const monitor = new SymbolWebSocketMonitor({
        host: new URL(symbolNodes[0]).hostname,
        ssl: true,
      });

      // 新しいブロックが生成されたときの処理
      monitor.on('block', (message) => {
        const blockInfo = message.data as unknown as BlockInfoDTO;
        console.log('Received block info :', blockInfo.block);
        const newHeight = formatStringNumber(blockInfo.block.height.toString());
        setHeight(newHeight);
        // 親コンポーネントへブロック高の変更を通知
        onHeightChange?.(newHeight);
        updateBlockProgress(blockInfo);
      });

      // ブロックがファイナライズされたときの処理
      monitor.on('finalizedBlock', async (message) => {
        const finalizedBlockInfo = message.data as unknown as FinalizedBlockDTO;
        console.log('Received finalized block info :', finalizedBlockInfo);
        setFinalizedHeight(formatStringNumber(finalizedBlockInfo.height.toString()));
        setFinalizationEpoch(formatStringNumber(finalizedBlockInfo.finalizationEpoch.toString()));
        setFinalizationPoint(formatStringNumber(finalizedBlockInfo.finalizationPoint.toString()));
      });

      // REST APIを使用して初期チェーン情報を取得
      const chainRoutesApi = new ChainRoutesApi(new Configuration({ basePath: symbolNodes[0] }));
      const chainInfo = await chainRoutesApi.getChainInfo();
      const blockRoutesApi = new BlockRoutesApi(new Configuration({ basePath: symbolNodes[0] }));
      const latestBlock = await blockRoutesApi.getBlockByHeight({ height: chainInfo.height });

      // 取得したチェーン情報を状態に設定
      const initialHeight = formatStringNumber(latestBlock.block.height.toString());
      setHeight(initialHeight);
      // 親コンポーネントへ初期ブロック高を通知
      onHeightChange?.(initialHeight);
      setFinalizedHeight(formatStringNumber(chainInfo.latestFinalizedBlock.height.toString()));
      setFinalizationEpoch(formatStringNumber(chainInfo.latestFinalizedBlock.finalizationEpoch.toString()));
      setFinalizationPoint(formatStringNumber(chainInfo.latestFinalizedBlock.finalizationPoint.toString()));

      // 最新ブロックからの経過時間を初期化
      updateBlockProgress(latestBlock);

      // 100ミリ秒ごとにブロック生成の経過時間を更新
      intervalId = setInterval(() => {
        if (lastBlockTimestampRef.current) {
          const now = new Date();
          const diffMs = now.getTime() - lastBlockTimestampRef.current.getTime();
          setBlockGenerationElapsedTime(calculateProgressPercent(diffMs));
        }
      }, 100);
    };
    fetchData();

    // コンポーネントのアンマウント時にタイマーをクリーンアップ
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [networkName]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Chain Info</Typography>

        <Grid container spacing={0.5}>
          {/* ブロック高 */}
          <Grid size={{ xs: 6, sm: 3, md: 3 }} sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Block Height
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {height}
            </Typography>
            <LinearProgress
              variant="buffer"
              color="primary"
              value={blockGenerationElapsedTime}
              valueBuffer={50}
              sx={{ m: 0, p: 0, backgroundColor: (theme) => theme.palette.divider }}
            />
          </Grid>

          {/* ファイナライズブロック高 */}
          <Grid size={{ xs: 6, sm: 3, md: 3 }} sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Finalized Height
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {finalizedHeight}
            </Typography>
          </Grid>

          {/* ファイナライズエポック */}
          <Grid size={{ xs: 6, sm: 3, md: 3 }} sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Finalized Epoch
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {finalizationEpoch}
            </Typography>
          </Grid>

          {/* ファイナライズポイント */}
          <Grid size={{ xs: 6, sm: 3, md: 3 }} sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Finalization Point
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {finalizationPoint}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChainInfoCard;
