import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';

const SearchFood = ({ setFilter, rows }) => {
  const [searched, setSearched] = useState('');

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
    <SearchBar
      value={searched}
      onChange={(searchVal) => requestSearchFood(searchVal)}
      onCancelSearch={() => cancelSearchFood()}
      placeholder="Search a food"
    />
  );
};

export default SearchFood;
