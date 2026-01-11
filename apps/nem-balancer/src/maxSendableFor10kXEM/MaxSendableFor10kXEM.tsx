import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { type SyntheticEvent, useState } from 'react';

import '../App.css';
import { usePageTitle } from '../hooks/usePageTitle';
import FromAccountPanel from './components/FromAccountPanel';
import ValueInputPanel from './components/ValueInputPanel';

// 型定義
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// ユーティリティ関数
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MaxSendableFor10kXEM() {
  // ページタイトルの設定
  usePageTitle('Max Sendable For 10k XEM');

  // UI状態管理
  const [value, setValue] = useState(0); // アクティブなタブのインデックス
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // タブ変更ハンドラー
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* タブナビゲーション */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label={isMobile ? 'Enter Value' : 'Calculate by Value Input'} {...tabProps(0)} />
            <Tab label={isMobile ? 'From Account' : 'Calculate from Account'} {...tabProps(1)} />
          </Tabs>
        </Box>

        {/* タブ1: 値を入力して計算 */}
        <CustomTabPanel value={value} index={0}>
          <ValueInputPanel />
        </CustomTabPanel>

        {/* タブ2: アカウントから計算（未実装） */}
        <CustomTabPanel value={value} index={1}>
          <FromAccountPanel />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default MaxSendableFor10kXEM;
