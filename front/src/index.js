import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Stack } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Stack
    sx={{
      position: 'absolute',
      minHeight: '100%',
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
