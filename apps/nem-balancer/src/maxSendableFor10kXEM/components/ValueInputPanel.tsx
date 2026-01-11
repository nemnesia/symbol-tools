/**
 * 値入力による最大送金可能額算出パネル
 * 残高と既得権残高を直接入力して、10,000 XEMの既得権残高を維持するための最大送金可能額を表示
 */
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

import { calcVestedBalanceAfterSend } from '../../libs/calcVestedBalance';
import { formatNumber, unformatNumber } from '../../libs/formatUtils';
import { keepVestedBalance } from '../../libs/keepVestedBalance';

export default function ValueInputPanel() {
  const [balance, setBalance] = useState('');
  const [vestedBalance, setVestedBalance] = useState('');
  const [balanceActive, setBalanceActive] = useState(false);
  const [vestedActive, setVestedActive] = useState(false);
  const [balanceError, setBalanceError] = useState('');
  const [vestedBalanceError, setVestedBalanceError] = useState('');
  const [maxSendable, setMaxSendable] = useState<number | null>(null);
  const [vestedAfterSend, setVestedAfterSend] = useState<number | null>(null);

  const handleValueCalculate = () => {
    let hasError = false;
    setBalanceError('');
    setVestedBalanceError('');

    const amountNum = Number(unformatNumber(balance));
    const vestedNum = Number(unformatNumber(vestedBalance));

    // 入力値検証
    if (!balance || amountNum === 0) {
      setBalanceError('Amount is required');
      hasError = true;
    } else if (isNaN(amountNum)) {
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
    if (hasError) {
      setMaxSendable(null);
      setVestedAfterSend(null);
      return;
    }

    // 最大送金可能額を計算（10,000 XEMの既得権残高を維持）
    const maxSendable = keepVestedBalance(amountNum, vestedNum);

    // 送金後既得権残高を計算
    const vested = calcVestedBalanceAfterSend({
      vestedBalance: vestedNum,
      totalBalance: amountNum,
      sendAmount: maxSendable,
      fee: 0,
    });
    setMaxSendable(maxSendable);
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
      {/* 計算実行ボタン */}
      <Button variant="contained" sx={{ mt: 2, width: '100%', height: '48px', fontSize: '1.1rem' }} onClick={handleValueCalculate}>
        Calculate
      </Button>
      {/* 計算結果表示 */}
      {vestedAfterSend !== null && (
        <Box sx={{ mt: 3, p: 1, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <div>
            Maximum transferable amount: <b>{formatNumber(maxSendable?.toString() ?? '')} XEM</b>
            <br />
            <span style={{ fontSize: '0.95em', color: '#666' }}>(Includes transaction fee)</span>
          </div>
          <div>
            Vested Balance after transfer: <b>{formatNumber(vestedAfterSend?.toString() ?? '')} XEM</b>
          </div>
        </Box>
      )}
    </Box>
  );
}
