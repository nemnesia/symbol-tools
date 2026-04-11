import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, FormControlLabel, IconButton, Switch, ThemeProvider, Toolbar, Typography, createTheme, useMediaQuery } from '@mui/material';
import { deepPurple, purple } from '@mui/material/colors';
import { useMemo, useState } from 'react';

import './App.css';
import FinalizationProofViewer from './components/FinalizationProofViewer';

function App() {
  // デバイスのテーマを取得
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);

  // ネットワーク選択 (URLパラメータ → localStorage → デフォルト testnet の優先順)
  const initialNetwork = (() => {
    const urlNetwork = new URLSearchParams(window.location.search).get('network');
    if (urlNetwork === 'mainnet' || urlNetwork === 'testnet') return urlNetwork;
    const saved = localStorage.getItem('networkName');
    return saved === 'mainnet' ? 'mainnet' : 'testnet';
  })();
  const [networkName, setNetworkName] = useState<'mainnet' | 'testnet'>(initialNetwork);

  const handleNetworkChange = (isMainnet: boolean) => {
    const network = isMainnet ? 'mainnet' : 'testnet';
    setNetworkName(network);
    localStorage.setItem('networkName', network);
  };

  // 初期値はデバイスのテーマ
  const currentMode = mode ?? (prefersDarkMode ? 'dark' : 'light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentMode,
          primary: deepPurple,
          secondary: purple,
        },
      }),
    [currentMode]
  );

  const handleThemeToggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme} noSsr>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <AppBar position="static" color="primary" enableColorOnDark>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Finalization Proof Viewer
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={networkName === 'mainnet'}
                  onChange={(e) => handleNetworkChange(e.target.checked)}
                  color="secondary"
                  size="small"
                />
              }
              label={networkName === 'mainnet' ? 'Mainnet' : 'Testnet'}
              sx={{ color: 'inherit', mr: 1, userSelect: 'none' }}
            />
            <IconButton color="inherit" onClick={handleThemeToggle} aria-label="toggle theme">
              {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <FinalizationProofViewer networkName={networkName} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
