import React from 'react';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';

const Results = ({
  lysine,
  proteines,
  calories,
  rows2,
  setLysine,
  setCalories,
  setProteines,
}) => {
  return (
    <Stack>
      {lysine ? (
        <Typography color="white">
          {' '}
          Lysine : {lysine} mg / Protéines : {proteines} g / Calories :{' '}
          {calories}
        </Typography>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default Results;
