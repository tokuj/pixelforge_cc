'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Logo } from '../common/Logo';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Logo variant="icon" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PixelForge
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};