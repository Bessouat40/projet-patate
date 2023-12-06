import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchMenu = ({ setFilter, rows }) => {
  const [searched, setSearched] = useState('');
  const [filledValue, setFilledValue] = useState('');

  const requestSearchMenu = (searchedVal) => {
    const filteredRows = Object.keys(rows).filter((row) => {
      return row.toLowerCase().includes(searchedVal.toLowerCase());
    });
    const newRows = {};
    filteredRows.map((value) => (newRows[value] = rows[value]));
    setFilter(newRows);
  };

  const cancelSearchMenu = () => {
    setSearched('');
    requestSearchMenu(searched);
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
        requestSearchMenu(searchVal.target.value);
        setFilledValue(searchVal.target.value);
      }}
      placeholder="Rechercher un aliment"
    />
  );
};

export default SearchMenu;
