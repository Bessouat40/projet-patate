import React from 'react';
import { Box, Button } from '@mui/material';

const AnalyzeMenu = ({ rows2, intakes, setIntakes }) => {
  const onSendMenu = async () => {
    const menu = JSON.stringify(rows2);
    const resp = await fetch('/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
