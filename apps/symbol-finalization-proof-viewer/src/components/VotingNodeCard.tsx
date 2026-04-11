import { Cancel, CheckCircle } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, LinearProgress, LinearProgressProps, Tooltip, Typography } from '@mui/material';

import { formatStringNumber } from '../utils/numberFormat';

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

interface VotingNodeCardProps {
  votingNodeInfo: VotingNodeInfoData;
  finalizationEpoch: string;
  stage0Height: string;
  stage1Height: string;
}

const VOTING_THRESHOLD = 3_000_000;

const parseAmountXym = (amount: string): number => {
  return parseFloat(amount.replace(/,/g, '').replace(' XYM', '')) || 0;
};

const LinearProgressExt = (props: LinearProgressProps & { value: number }) => {
  let color: 'success' | 'warning' | 'error' = 'success';
  if (props.value < 85) {
    color = 'success';
  } else if (props.value <= 99) {
    color = 'warning';
  } else {
    color = 'error';
  }
  return <LinearProgress variant="determinate" color={color} value={props.value} />;
};

const judgmentVotingKey = (currentEpoch: number, startEpoch: number, endEpoch: number) => {
  if (currentEpoch < startEpoch) {
    return 'Next';
  } else if (currentEpoch > endEpoch) {
    return 'Expired';
  }
  return 'Current';
};

function VotingNodeCard({ votingNodeInfo, finalizationEpoch, stage0Height, stage1Height }: VotingNodeCardProps) {
  const currentEpoch = parseInt(finalizationEpoch.replace(/,/g, ''));
  const hasEnoughAmount = parseAmountXym(votingNodeInfo.amount) >= VOTING_THRESHOLD;
  const firstKey = votingNodeInfo.votingPublicKeys?.[0];

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
        {/* トップ行: Host ⓘ | 残高アイコン | [Current] ✓ [Prev] ✓ */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {/* Host — ホバー/タップで PublicKey・Address を表示 */}
          <Tooltip
            enterTouchDelay={0}
            title={
              <Box>
                <Typography variant="caption" display="block" sx={{ fontWeight: 'bold' }}>
                  PublicKey
                </Typography>
                <Typography variant="caption" display="block" sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
                  {votingNodeInfo.publicKey}
                </Typography>
                <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                  Address
                </Typography>
                <Typography variant="caption" display="block" sx={{ fontFamily: 'monospace' }}>
                  {votingNodeInfo.address}
                </Typography>
              </Box>
            }
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', cursor: 'help', flexGrow: 1 }}>
              {votingNodeInfo.host}
            </Typography>
          </Tooltip>

          {/* 残高チェックアイコン — ホバー/タップで Amount を表示 */}
          <Tooltip enterTouchDelay={0} title={votingNodeInfo.amount}>
            <Chip label="Amount" size="small" variant="outlined" sx={{ cursor: 'help' }} />
          </Tooltip>
          {hasEnoughAmount ? (
            <CheckCircle color="success" fontSize="small" />
          ) : (
            <Cancel color="error" fontSize="small" />
          )}

          {/* ファイナライゼーション署名 — 最初の投票キーのみ表示 */}
          {firstKey && (
            <>
              {/* Current round (Stage1) */}
              <Tooltip enterTouchDelay={0} title={`Height: ${stage1Height}`}>
                <Chip label="Current" size="small" variant="outlined" sx={{ cursor: 'help' }} />
              </Tooltip>
              <Tooltip
                enterTouchDelay={0}
                title={
                  firstKey.stage1Signature && firstKey.stage1Signature !== '-'
                    ? firstKey.stage1Signature
                    : 'No signature'
                }
              >
                <span>
                  {firstKey.stage1Signature && firstKey.stage1Signature !== '-' ? (
                    <CheckCircle color="success" fontSize="small" />
                  ) : (
                    <Cancel color="error" fontSize="small" />
                  )}
                </span>
              </Tooltip>

              {/* Prev round (Stage0) */}
              <Tooltip enterTouchDelay={0} title={`Height: ${stage0Height}`}>
                <Chip label="Prev" size="small" variant="outlined" sx={{ cursor: 'help' }} />
              </Tooltip>
              <Tooltip
                enterTouchDelay={0}
                title={
                  firstKey.stage0Signature && firstKey.stage0Signature !== '-'
                    ? firstKey.stage0Signature
                    : 'No signature'
                }
              >
                <span>
                  {firstKey.stage0Signature && firstKey.stage0Signature !== '-' ? (
                    <CheckCircle color="success" fontSize="small" />
                  ) : (
                    <Cancel color="error" fontSize="small" />
                  )}
                </span>
              </Tooltip>
            </>
          )}
        </Box>

        {/* 投票キー期間 — 縦積み、Expired はグレーアウト */}
        {votingNodeInfo.votingPublicKeys && votingNodeInfo.votingPublicKeys.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {votingNodeInfo.votingPublicKeys.map((val, index) => {
              const status = judgmentVotingKey(currentEpoch, val.startEpoch!, val.endEpoch!);
              const isExpired = status === 'Expired';
              return (
                <Box key={index} sx={{ opacity: isExpired ? 0.45 : 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip enterTouchDelay={0} title={val.votingPublicKey!}>
                      <Chip
                        label={status}
                        size="small"
                        color={status === 'Current' ? 'primary' : 'default'}
                        variant={isExpired ? 'outlined' : 'filled'}
                        sx={{ cursor: 'help', minWidth: 70 }}
                      />
                    </Tooltip>
                    <Typography variant="caption" sx={{ minWidth: 55, textAlign: 'right', fontFamily: 'monospace' }}>
                      {formatStringNumber(val.startEpoch!.toString())}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgressExt value={val.progress!} />
                    </Box>
                    <Typography variant="caption" sx={{ minWidth: 55, fontFamily: 'monospace' }}>
                      {formatStringNumber(val.endEpoch!.toString())}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default VotingNodeCard;
