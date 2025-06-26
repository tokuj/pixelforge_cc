'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Logo } from '@/components/common/Logo';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Logo variant="full" width={200} height={60} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
            Transform your photos into pixel art masterpieces
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Development in progress...
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PixelForge will soon let you convert your images into stunning pixel art 
            with customizable settings, presets, and effects.
          </Typography>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}