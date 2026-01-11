/**
 * 値入力による送金後既得権残高算出パネル
 * 残高と既得権残高、送金額を直接入力して、送金後の既得権残高を表示
 */
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

import { calcVestedBalanceAfterSend } from '../../libs/calcVestedBalance';
import { formatNumber, unformatNumber } from '../../libs/formatUtils';

export default function ValueInputPanel() {
  const [balance, setBalance] = useState('');
  const [vestedBalance, setVestedBalance] = useState('');
  const [amountSent, setAmountSent] = useState('');
  const [fee, setFee] = useState('0.05');
  const [balanceActive, setBalanceActive] = useState(false);
  const [vestedActive, setVestedActive] = useState(false);
  const [amountActive, setAmountActive] = useState(false);
  const [balanceError, setBalanceError] = useState('');
  const [vestedBalanceError, setVestedBalanceError] = useState('');
  const [amountSentError, setAmountSentError] = useState('');
  const [feeError, setFeeError] = useState('');
  const [vestedAfterSend, setVestedAfterSend] = useState<number | null>(null);

  const handleValueCalculate = () => {
    let hasError = false;
    setBalanceError('');
    setVestedBalanceError('');
    setAmountSentError('');
    setFeeError('');

    const balanceNum = Number(unformatNumber(balance));
    const vestedNum = Number(unformatNumber(vestedBalance));
    const amountSentNum = Number(unformatNumber(amountSent));

    // 入力値検証
    if (!balance || balanceNum === 0) {
      setBalanceError('Amount is required');
      hasError = true;
    } else if (isNaN(balanceNum)) {
      setBalanceError('Please enter a valid number');
      hasError = true;
    }
    if (!vestedBalance) {
      setVestedBalanceError('Vested Balance is required');
      hasError = true;
    } else if (isNaN(vestedNum)) {
      setVestedBalanceError('Please enter a valid number');
      hasError = true;
    }
    if (!amountSent || amountSentNum === 0) {
      setAmountSentError('Amount Sent is required');
      hasError = true;
    } else if (isNaN(amountSentNum)) {
      setAmountSentError('Please enter a valid number');
      hasError = true;
    }
    if (balanceNum <= amountSentNum) {
      setBalanceError('Amount must be greater than Amount Sent');
      hasError = true;
    }
    if (hasError) {
      setVestedAfterSend(null);
      return;
    }

    // 送金後既得権残高を計算
    const feeNum = Number(unformatNumber(fee));
    const vested = calcVestedBalanceAfterSend({
      vestedBalance: vestedNum,
      totalBalance: balanceNum,
      sendAmount: amountSentNum,
      fee: feeNum,
    });
    setVestedAfterSend(vested);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400 }}>
      {/* 総保有量入力 */}
      <TextField
        id="balance"
        label="Balance"
        variant="standard"
        type="text"
        value={balanceActive ? unformatNumber(balance) : formatNumber(balance)}
        onChange={(e) => setBalance(e.target.value.replace(/[^\d.]/g, ''))}
        onFocus={() => setBalanceActive(true)}
        onBlur={() => {
          setBalanceActive(false);
          setBalance(formatNumber(unformatNumber(balance)));
        }}
        error={!!balanceError}
        helperText={balanceError}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">XEM</InputAdornment>,
            sx: {
              '& input': { textAlign: 'right' },
            },
          },
        }}
      />
      {/* 既得権残高入力 */}
      <TextField
        id="vested-balance"
        label="Vested Balance"
        variant="standard"
        type="text"
        value={vestedActive ? unformatNumber(vestedBalance) : formatNumber(vestedBalance)}
        onChange={(e) => setVestedBalance(e.target.value.replace(/[^\d.]/g, ''))}
        onFocus={() => setVestedActive(true)}
        onBlur={() => {
          setVestedActive(false);
          setVestedBalance(formatNumber(unformatNumber(vestedBalance)));
        }}
        error={!!vestedBalanceError}
        helperText={vestedBalanceError}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">XEM</InputAdornment>,
            sx: {
              '& input': { textAlign: 'right' },
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
      <Button variant="contained" sx={{ mt: 2, width: '100%', height: '48px', fontSize: '1.1rem' }} onClick={handleValueCalculate}>
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
