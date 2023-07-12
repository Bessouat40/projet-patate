import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Stack } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Stack
    sx={{
      backgroundColor: '#ECA059',
      position: 'absolute',
      height: '100%',
      top: 0,
      right: 0,
      left: 0,
      margin: 0,
      marginBottom: 2,
      padding: 0,
    }}
  >
    <App />
  </Stack>
);
