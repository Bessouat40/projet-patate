import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchFood = ({ setFilter, rows }) => {
  const [searched, setSearched] = useState('');
  const [filledValue, setFilledValue] = useState('');

  const requestSearchFood = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row['ALIMENT'].toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilter(filteredRows);
  };

  const cancelSearchFood = () => {
    setSearched('');
    requestSearchFood(searched);
  };

  return (
    <TextField
      sx={{
        backgroundColor: 'white',
        width: '30%',
        borderRadius: '5px',
      }}
      value={filledValue}
      onChange={(searchVal) => {
        requestSearchFood(searchVal.target.value);
        setFilledValue(searchVal.target.value);
      }}
      onCancelSearch={() => cancelSearchFood()}
      placeholder="Rechercher un aliment"
    />
  );
};

export default SearchFood;
