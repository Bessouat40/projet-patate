import React from 'react';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';

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
    console.log(intakes);
  };
  return (
    <Stack
      spacing={5}
      alignItems="center"
      sx={{ width: '45%', maxHeight: '100%' }}
    >
      <Button
        variant="contained"
        sx={{
          height: '10%',
          width: '50%',
          justifyContent: 'center',
          backgroundColor: '#423325',
          color: 'white',
          '&:hover': {
            backgroundColor: '#9C6735',
          },
        }}
        onClick={onSendMenu}
      >
        Analyser le menu
      </Button>
    </Stack>
  );
};

export default AnalyzeMenu;
