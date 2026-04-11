import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Link, Switch, ThemeProvider, Toolbar, Tooltip, Typography, createTheme, useMediaQuery } from '@mui/material';
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
  const [supportOpen, setSupportOpen] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const copySymbolAddress = () => {
    navigator.clipboard.writeText('NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA');
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

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
            <Button
              color="inherit"
              size="small"
              startIcon={<FavoriteIcon fontSize="small" />}
              onClick={() => setSupportOpen(true)}
              sx={{ mr: 1, textTransform: 'none' }}
            >
              支援する
            </Button>
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

      <Dialog open={supportOpen} onClose={() => setSupportOpen(false)}>
        <DialogTitle>支援する</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            このツールが役に立ったら、Amazonウィッシュリストから支援していただけると嬉しいです。
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Symbol (XYM) でも支援を受け付けています。</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', flexGrow: 1, wordBreak: 'break-all' }}>
              NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA
            </Typography>
            <Tooltip title={addressCopied ? 'Copied!' : 'コピー'} enterTouchDelay={0}>
              <IconButton size="small" onClick={copySymbolAddress}>
                {addressCopied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Link
              href="https://www.amazon.co.jp/hz/wishlist/ls/DUWO6N1NXBGV?ref_=wl_share"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Button variant="contained" color="secondary" startIcon={<FavoriteIcon />}>
                Amazonウィッシュリストを見る
              </Button>
            </Link>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
