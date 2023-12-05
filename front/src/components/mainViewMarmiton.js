import { Stack } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MainViewMarmiton = () => {
  const [link, setLink] = useState('');
  const [food, setFood] = useState('');

  const handleChangeLink = (event) => {
    setLink(event.target.value);
  };

  const searchFoodList = async () => {
    setFood('');
    alert(link);
    const link_ = { url: link };
    const resp = await fetch('http://localhost:8000/food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(link_),
    });
    const food_ = await resp.json();
    setFood(food_);
  };
  return (
    <Stack
      spacing={5}
      alignItems="center"
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      <Typography>Link to Marmiton recipe : </Typography>
      <TextField
        label="Outlined"
        variant="outlined"
        onChange={handleChangeLink}
      />
      <Button onClick={searchFoodList}>Search food list</Button>
      <Typography>{food}</Typography>
    </Stack>
  );
};

export default MainViewMarmiton;
