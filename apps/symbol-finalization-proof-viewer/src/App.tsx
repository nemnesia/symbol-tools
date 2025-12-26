import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, IconButton, ThemeProvider, Toolbar, Typography, createTheme, useMediaQuery } from '@mui/material';
import { deepPurple, purple } from '@mui/material/colors';
import { useMemo, useState } from 'react';

import './App.css';
import FinalizationProofViewer from './FinalizationProofViewer';

function App() {
  // デバイスのテーマを取得
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);

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
            <IconButton color="inherit" onClick={handleThemeToggle} aria-label="toggle theme">
              {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <FinalizationProofViewer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
