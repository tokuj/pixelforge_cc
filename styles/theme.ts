import { createTheme } from '@mui/material/styles';

export const pixelForgeColors = {
  primary: '#45B7D1',      // 水色
  secondary: '#FF6B6B',    // 赤
  accent1: '#4ECDC4',      // 青緑
  accent2: '#96CEB4',      // 緑
  accent3: '#DDA0DD',      // 紫
  background: '#f8f9fa',
  surface: '#ffffff',
  text: '#333333',
};

export const pixelForgeTheme = createTheme({
  palette: {
    primary: {
      main: pixelForgeColors.primary,
      light: pixelForgeColors.accent1,
      dark: '#35a7c1',
    },
    secondary: {
      main: pixelForgeColors.secondary,
      light: pixelForgeColors.accent3,
      dark: '#ee5555',
    },
    success: {
      main: pixelForgeColors.accent2,
    },
    background: {
      default: pixelForgeColors.background,
      paper: pixelForgeColors.surface,
    },
    text: {
      primary: pixelForgeColors.text,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});