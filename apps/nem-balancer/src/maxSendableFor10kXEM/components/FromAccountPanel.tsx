/**
 * アドレスから最大送金可能額を算出するパネル
 * NEMアドレスを入力して、10,000 XEMの既得権残高を維持するための最大送金可能額を表示
 */
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

import { calcVestedBalanceAfterSend } from '../../libs/calcVestedBalance';
import { formatNumber } from '../../libs/formatUtils';
import { keepVestedBalance } from '../../libs/keepVestedBalance';
import { fetchAccountInfo, fetchNemNode } from '../../libs/nemUtils';

export default function FromAccountPanel() {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [maxSendable, setMaxSendable] = useState<number | null>(null);
  const [vestedAfterSend, setVestedAfterSend] = useState<number | null>(null);

  const handleCalculate = async () => {
    let hasError = false;
    setAddressError('');

    // 入力値検証
    if (!address) {
      setAddressError('Address is required');
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

      // 最大送金可能額を計算（10,000 XEMの既得権残高を維持）
      const maxSendable = keepVestedBalance(balance, vestedBalance);

      // 送金後既得権残高を計算
      const vested = calcVestedBalanceAfterSend({
        vestedBalance,
        totalBalance: balance,
        sendAmount: maxSendable,
        fee: 0,
      });
      setMaxSendable(maxSendable);
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
      {/* 計算実行ボタン */}
      <Button variant="contained" sx={{ mt: 2, width: '100%', height: '48px', fontSize: '1.1rem' }} onClick={handleCalculate}>
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
