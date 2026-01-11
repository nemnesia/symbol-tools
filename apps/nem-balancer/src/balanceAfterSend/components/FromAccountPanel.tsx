/**
 * アドレスから送金後既得権残高を算出するパネル
 * NEMアドレスと送金額を入力して、送金後の既得権残高を表示
 */
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

import { calcVestedBalanceAfterSend } from '../../libs/calcVestedBalance';
import { formatNumber, unformatNumber } from '../../libs/formatUtils';
import { fetchAccountInfo, fetchNemNode } from '../../libs/nemUtils';

export default function FromAccountPanel() {
  const [address, setAddress] = useState('');
  const [amountSent, setAmountSent] = useState('');
  const [fee, setFee] = useState('0.05');
  const [amountActive, setAmountActive] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [amountSentError, setAmountSentError] = useState('');
  const [feeError, setFeeError] = useState('');
  const [vestedAfterSend, setVestedAfterSend] = useState<number | null>(null);

  const handleCalculate = async () => {
    let hasError = false;
    setAddressError('');
    setAmountSentError('');
    setFeeError('');

    const amountSentNum = Number(unformatNumber(amountSent));

    // 入力値検証
    if (!address) {
      setAddressError('Address is required');
      hasError = true;
    }
    if (!amountSent || amountSentNum === 0) {
      setAmountSentError('Amount Sent is required');
      hasError = true;
    } else if (isNaN(amountSentNum)) {
      setAmountSentError('Please enter a valid number');
      hasError = true;
    }
    if (hasError) {
      setVestedAfterSend(null);
      return;
    }

    // NEMノード取得
    let nodeUrl: string;
    try {
      nodeUrl = await fetchNemNode();
      console.log('NEM Node:', nodeUrl);
    } catch (error) {
      setAddressError('Failed to fetch NEM node. Please try again later.');
      console.error(error);
      return;
    }

    // アカウント情報取得
    try {
      const { balance, vestedBalance } = await fetchAccountInfo(nodeUrl, address);

      if (balance <= amountSentNum) {
        setAmountSentError('Account balance must be greater than Amount Sent');
        setVestedAfterSend(null);
        return;
      }

      // 送金後既得権残高を計算
      const feeNum = Number(unformatNumber(fee));
      const vested = calcVestedBalanceAfterSend({
        vestedBalance,
        totalBalance: balance,
        sendAmount: amountSentNum,
        fee: feeNum,
      });
      setVestedAfterSend(vested);
    } catch (error) {
      setAddressError('Failed to fetch account info. Please check the address and try again.');
      console.error(error);
      return;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400 }}>
      {/* NEMアドレス入力 */}
      <TextField
        id="address"
        label="NEM Address"
        variant="standard"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={!!addressError}
        helperText={addressError}
        slotProps={{
          input: {
            sx: {
              '& input': { textAlign: 'right' },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '& input[type=number]': { MozAppearance: 'textfield' },
            },
          },
        }}
      />
      {/* 送金額入力 */}
      <TextField
        id="amount-sent"
        label="Amount Sent"
        variant="standard"
        type="text"
        value={amountActive ? unformatNumber(amountSent) : formatNumber(amountSent)}
        onChange={(e) => setAmountSent(e.target.value.replace(/[^\d.]/g, ''))}
        onFocus={() => setAmountActive(true)}
        onBlur={() => {
          setAmountActive(false);
          setAmountSent(formatNumber(unformatNumber(amountSent)));
        }}
        error={!!amountSentError}
        helperText={amountSentError}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">XEM</InputAdornment>,
            sx: {
              '& input': { textAlign: 'right' },
            },
          },
        }}
      />
      {/* 手数料入力（0.05刻み） */}
      <TextField
        id="fee"
        label="Fee"
        type="number"
        variant="standard"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        error={!!feeError}
        helperText={feeError}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">XEM</InputAdornment>,
            sx: {
              '& input': { textAlign: 'right' },
            },
            inputProps: { step: 0.05, min: 0 },
          },
        }}
      />
      {/* 計算実行ボタン */}
      <Button variant="contained" sx={{ mt: 2, width: '100%', height: '48px', fontSize: '1.1rem' }} onClick={handleCalculate}>
        Calculate
      </Button>
      {/* 計算結果表示 */}
      {vestedAfterSend !== null && (
        <Box sx={{ mt: 3, p: 1, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <div>
            Balance after transfer: <b>{formatNumber(vestedAfterSend.toString())} XEM</b>
          </div>
        </Box>
      )}
    </Box>
  );
}
