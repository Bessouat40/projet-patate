import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Stack } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Stack
    sx={{
      background:
        'linear-gradient(39deg, #423325 0%, #C17329 35%, #C17329 65%, #423325 100%)',
      position: 'absolute',
      minHeight: '100%',
      top: 0,
      right: 0,
      left: 0,
      margin: 0,
      marginBottom: 2,
      padding: 0,
      width: '100%',
    }}
  >
    <App />
  </Stack>
);
