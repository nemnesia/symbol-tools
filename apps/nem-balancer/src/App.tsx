/**
 * メインアプリケーションコンポーネント
 * テーマ切り替え、ナビゲーション、ルーティングを管理
 */
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import './App.css';
import BalanceAcquisitionPlan from './balanceAcquisitionPlan/BalanceAcquisitionPlan';
import BalanceAfterSend from './balanceAfterSend/BalanceAfterSend';
import MaxSendableFor10kXEM from './maxSendableFor10kXEM/MaxSendableFor10kXEM';

/**
 * 初期テーマを取得
 * ローカルストレージに保存された値、またはシステム設定から決定
 */
const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** メニュー項目の定義 */
const menuItems = [
  { text: 'Vested Balance Acquisition Plan', path: '/' },
  { text: 'Vested Balance After Send', path: '/balance-after-send' },
  { text: 'Max Sendable For 10k XEM', path: '/max-sendable-for-10k-xem' },
];

function AppContent() {
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialTheme);
  const [pageTitle, setPageTitle] = useState('Vested Balance Acquisition Plan');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // テーマをローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  // ページタイトル変更イベントのリスナー
  useEffect(() => {
    const handleTitleChange = (event: CustomEvent<string>) => {
      setPageTitle(event.detail);
    };

    window.addEventListener('page-title-change', handleTitleChange as EventListener);
    return () => {
      window.removeEventListener('page-title-change', handleTitleChange as EventListener);
    };
  }, []);

  // テーマオブジェクトを作成
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // テーマ切り替え
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // ドロワー開閉
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton className="menu-button" size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className="app-title">
            {pageTitle}
          </Typography>
          <IconButton className="theme-toggle" onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box className="drawer-content" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box className="content">
        <Routes>
          <Route path="/" element={<BalanceAcquisitionPlan />} />
          <Route path="/balance-after-send" element={<BalanceAfterSend />} />
          <Route path="/max-sendable-for-10k-xem" element={<MaxSendableFor10kXEM />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
