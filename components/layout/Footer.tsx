'use client';

import { Box, Typography, Container } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        py: 3, 
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 PixelForge. Transform your photos into pixel art masterpieces.
        </Typography>
      </Container>
    </Box>
  );
};