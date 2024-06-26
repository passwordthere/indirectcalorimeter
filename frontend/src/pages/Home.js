// src/pages/Home.js
import React from 'react';
import { Container, Box, Typography, CssBaseline } from '@mui/material';

function Home() {
  return (
    <div>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 4, mt: 10 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Medical Analysis Dashboard
          </Typography>
          <Typography variant="body1">
            This is a basic example of a homepage using Material-UI components.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default Home;