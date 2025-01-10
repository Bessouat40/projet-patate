import React from 'react';
import { Box, Button } from '@mui/material';

const AnalyzeMenu = ({ rows2, keycloak, setIntakes }) => {
  const token = keycloak.token;
  const onSendMenu = async () => {
    const menu = JSON.stringify(rows2);
    const resp = await fetch('http://localhost:8000/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: menu,
    });
    const _intakes = await resp.json();
    setIntakes(_intakes);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onSendMenu}
      >
        Analyser le menu
      </Button>
    </Box>
  );
};

export default AnalyzeMenu;
