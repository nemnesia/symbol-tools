/**
 * 値入力による既得権残高取得計画算出パネル
 * 残高と既得権残高を直接入力して、既得権残高の増加スケジュールを表示
 */
import { Box, Button, InputAdornment, TextField, useTheme } from '@mui/material';
import { useState } from 'react';

import { formatNumber, unformatNumber } from '../../libs/formatUtils';
import type { CalculationResult } from '../../libs/vesting';
import { calculateVestingSchedule } from '../../libs/vesting';

export default function ValueInputPanel({ today }: { today: string }) {
  const theme = useTheme();
  const [balance, setBalance] = useState('');
  const [vestedBalance, setVestedBalance] = useState('');
  const [targetVestedBalance, setTargetVestedBalance] = useState('10000');
  const [startDate, setStartDate] = useState(today);
  const [balanceActive, setBalanceActive] = useState(false);
  const [vestedActive, setVestedActive] = useState(false);
  const [targetActive, setTargetActive] = useState(false);
  const [balanceError, setBalanceError] = useState('');
  const [vestedBalanceError, setVestedBalanceError] = useState('');
  const [targetVestedBalanceError, setTargetVestedBalanceError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleValueCalculate = () => {
    let hasError = false;
    setBalanceError('');
    setVestedBalanceError('');
    setTargetVestedBalanceError('');
    setStartDateError('');

    const balanceNum = Number(unformatNumber(balance));
    const vestedNum = Number(unformatNumber(vestedBalance));
    const targetNum = Number(unformatNumber(targetVestedBalance));

    // 入力値検証
    if (!balance || balanceNum === 0) {
      setBalanceError('Balance is required');
      hasError = true;
    } else if (isNaN(balanceNum)) {
      setBalanceError('Please enter a valid number');
      hasError = true;
    }
    if (vestedBalance === '') {
      setVestedBalanceError('Vested Balance is required');
      hasError = true;
    } else if (isNaN(vestedNum)) {
      setVestedBalanceError('Please enter a valid number');
      hasError = true;
    }
    if (!targetVestedBalance || targetNum === 0) {
      setTargetVestedBalanceError('Target Vested Balance is required');
      hasError = true;
    } else if (isNaN(targetNum)) {
      setTargetVestedBalanceError('Please enter a valid number');
      hasError = true;
    }
    if (balanceNum <= targetNum) {
      setBalanceError('Balance must be greater than Target Vested Balance');
      hasError = true;
    }
    if (!startDate) {
      setStartDateError('Start Date is required');
      hasError = true;
    } else {
      const todayDate = new Date(today);
      const inputDate = new Date(startDate);
      if (inputDate > todayDate) {
        setStartDateError('Start Date cannot be in the future');
        hasError = true;
      }
    }
    if (hasError) {
      setResult(null);
      return;
    }

    // Vestingスケジュールを計算
    const result = calculateVestingSchedule(balanceNum, vestedNum, targetNum, startDate);
    setResult(result);
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
      {/* 目標既得権残高入力 */}
      <TextField
        id="target-vested-balance"
        label="Target Vested Balance"
        variant="standard"
        type="text"
        value={targetActive ? unformatNumber(targetVestedBalance) : formatNumber(targetVestedBalance)}
        onChange={(e) => setTargetVestedBalance(e.target.value.replace(/[^\d.]/g, ''))}
        onFocus={() => setTargetActive(true)}
        onBlur={() => {
          setTargetActive(false);
          setTargetVestedBalance(formatNumber(unformatNumber(targetVestedBalance)));
        }}
        error={!!targetVestedBalanceError}
        helperText={targetVestedBalanceError}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">XEM</InputAdornment>,
            sx: {
              '& input': { textAlign: 'right' },
            },
          },
        }}
      />
      {/* 開始日入力 */}
      <TextField
        id="start-date"
        label="Start Date"
        type="date"
        variant="standard"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        error={!!startDateError}
        helperText={startDateError}
        slotProps={{
          inputLabel: { shrink: true },
          input: { sx: { colorScheme: theme.palette.mode } },
        }}
      />
      {/* 計算実行ボタン */}
      <Button variant="contained" sx={{ mt: 2, width: '100%', height: '48px', fontSize: '1.1rem' }} onClick={handleValueCalculate}>
        Calculate
      </Button>
      {/* 計算結果表示 */}
      {result && (
        <Box sx={{ mt: 3, p: 1, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <div>
            Days to reach target vested balance: <b>{result.daysToGoal} days</b>
          </div>
          <div>
            Estimated achievement date: <b>{result.goalDate}</b>
          </div>
          <Box sx={{ mt: 2 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '4px' }}>Date</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: '4px' }}>Vested Balance</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: '4px' }}>Increase</th>
                </tr>
              </thead>
              <tbody>
                {result.table.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '4px' }}>{row.date}</td>
                    <td style={{ borderBottom: '1px solid #eee', textAlign: 'right', padding: '4px' }}>
                      {row.vested.toLocaleString()} XEM
                    </td>
                    <td style={{ borderBottom: '1px solid #eee', textAlign: 'right', padding: '4px' }}>
                      {row.increase.toLocaleString()} XEM
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Box>
  );
}
