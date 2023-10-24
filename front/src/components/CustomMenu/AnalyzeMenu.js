import React from 'react';
import { Stack } from '@mui/material';
import MenuTitle from './menuTitle';
import DataGridMenu from './dataGridMenu';
import { Button } from '@mui/material';

const AnalyzeMenu = ({ apiRef2, rows2, intakes, setIntakes }) => {
  const onSendMenu = async () => {
    const menu = JSON.stringify(rows2);
    const resp = await fetch('http://localhost:8000/menu', {
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
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={10}
    >
      <Stack
        spacing={5}
        alignItems="center"
        sx={{ width: '45%', maxHeight: '100%' }}
      >
        <MenuTitle />
        <DataGridMenu apiRef2={apiRef2} rows2={rows2} />
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
    </Stack>
  );
};

export default AnalyzeMenu;
