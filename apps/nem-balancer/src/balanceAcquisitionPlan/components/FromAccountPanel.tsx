/**
 * アドレスから既得権残高取得計画を算出するパネル
 * NEMアドレスを入力して、既得権残高の増加スケジュールを表示
 */
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

import { formatNumber, unformatNumber } from '../../libs/formatUtils';
import { fetchAccountInfo, fetchNemNode } from '../../libs/nemUtils';
import type { CalculationResult } from '../../libs/vesting';
import { calculateVestingSchedule } from '../../libs/vesting';

export default function FromAccountPanel({ today }: { today: string }) {
  const [address, setAddress] = useState('');
  const [targetVestedBalance, setTargetVestedBalance] = useState('10000');
  const [targetActive, setTargetActive] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [targetVestedBalanceError, setTargetVestedBalanceError] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = async () => {
    let hasError = false;
    setAddressError('');
    setTargetVestedBalanceError('');

    const targetNum = Number(unformatNumber(targetVestedBalance));

    // 入力値検証
    if (!address) {
      setAddressError('Address is required');
      hasError = true;
    }
    if (!targetVestedBalance || targetNum === 0) {
      setTargetVestedBalanceError('Target Vested Balance is required');
      hasError = true;
    } else if (isNaN(targetNum)) {
      setTargetVestedBalanceError('Please enter a valid number');
      hasError = true;
    }
    if (hasError) {
      setResult(null);
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

      if (balance <= targetNum) {
        setTargetVestedBalanceError('Account balance must be greater than Target Vested Balance');
        setResult(null);
        return;
      }

      // Vestingスケジュールを計算
      const result = calculateVestingSchedule(balance, vestedBalance, targetNum, today);
      setResult(result);
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
      {/* 計算実行ボタン */}
      <Button variant="contained" sx={{ mt: 2, width: '100%', height: '48px', fontSize: '1.1rem' }} onClick={handleCalculate}>
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
