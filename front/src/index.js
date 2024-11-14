import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Stack
      sx={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <App />
    </Stack>
  </ThemeProvider>
);
