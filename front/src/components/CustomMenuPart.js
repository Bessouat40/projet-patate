import React from 'react';
import { Stack } from '@mui/material';
import MenuTitle from './subcomponents/menuTitle';
import Results from './results';
import DataGridMenu from './dataGridMenu';
import { Button } from '@mui/material';

const CustomMenuPart = ({
  lysine,
  proteines,
  calories,
  apiRef2,
  rows2,
  setLysine,
  setProteines,
  setCalories,
}) => {
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
    const _lysine = _intakes['lysine'];
    const _calories = _intakes['calories'];
    const _proteines = _intakes['proteines'];
    setLysine(_lysine);
    setProteines(_proteines);
    setCalories(_calories);
  };
  return (
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
        Analyze Menu
      </Button>
      <Results lysine={lysine} calories={calories} proteines={proteines} />
    </Stack>
  );
};

export default CustomMenuPart;
