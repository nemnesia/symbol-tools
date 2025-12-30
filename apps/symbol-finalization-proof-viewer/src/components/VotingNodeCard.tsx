import { Cancel, CheckCircle } from '@mui/icons-material';
import { Card, CardContent, Grid, LinearProgress, LinearProgressProps, Tooltip, Typography } from '@mui/material';
import React from 'react';

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
      <Typography variant="caption" component="div" sx={{ color: 'text.secondary', fontSize: 14 }}>
        {props.title}
      </Typography>
      <Typography
        variant="body2"
        component="div"
        gutterBottom
        style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}
      >
        {props.value}
      </Typography>
    </>
  );
};

/**
 * 文字列を6文字ごとにスペースで区切る（スペースはコピー不可）
 * @param str 文字列
 * @returns JSX.Element
 */
const formatAddressWithSpaces = (str: string): React.JSX.Element => {
  const parts = str.match(/.{1,6}/g) ?? [str];
  return (
    <>
      {parts.map((part, idx) => (
        <React.Fragment key={idx}>
          {part}
          {idx !== parts.length - 1 && <span style={{ userSelect: 'none' }}> </span>}
        </React.Fragment>
      ))}
    </>
  );
};

const formatPublicKeyWithSpaces = (str: string): React.JSX.Element => {
  const parts = str.match(/.{1,8}/g) ?? [str];
  return (
    <>
      {parts.map((part, idx) => (
        <React.Fragment key={idx}>
          {part}
          {idx !== parts.length - 1 && <span style={{ userSelect: 'none' }}> </span>}
        </React.Fragment>
      ))}
    </>
  );
};

function VotingNodeCard({ votingNodeInfo, finalizationEpoch, stage0Height, stage1Height }: VotingNodeCardProps) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }} style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 18, fontWeight: 'bold' }}>
          Node Info
        </Typography>

        <Grid container spacing={0.5}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Host
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {votingNodeInfo.host}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              PublicKey
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {formatPublicKeyWithSpaces(votingNodeInfo.publicKey)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 9 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Address
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {formatAddressWithSpaces(votingNodeInfo.address)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Amount
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {votingNodeInfo.amount}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Card sx={{ minWidth: 275 }} style={{ marginTop: '10px' }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 18, fontWeight: 'bold' }}>
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
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Voting PublicKey
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            {formatPublicKeyWithSpaces(val.votingPublicKey!)}
                          </Typography>
                          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Voting Key Period
                            </Typography>
                            <Typography
                              variant="body2"
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
                            {/* 今回 */}
                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {`Stage1 Bottom Signature (Height: ${stage1Height})`}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                {val.stage1Signature && val.stage1Signature !== '-' ? (
                                  <Tooltip title={val.stage1Signature} arrow>
                                    <CheckCircle color="success" />
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="No signature" arrow>
                                    <Cancel color="error" />
                                  </Tooltip>
                                )}
                              </Typography>
                            </Grid>

                            {/* 前回 */}
                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {`Stage0 Bottom Signature (Height: ${stage0Height})`}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                {val.stage0Signature && val.stage0Signature !== '-' ? (
                                  <Tooltip title={val.stage0Signature} arrow>
                                    <CheckCircle color="success" />
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="No signature" arrow>
                                    <Cancel color="error" />
                                  </Tooltip>
                                )}
                              </Typography>
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
  );
}

export default VotingNodeCard;
