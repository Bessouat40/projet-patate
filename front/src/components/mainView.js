import React, { useState, useEffect } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import FoodListButton from './subcomponents/foodlistButtons';
import DataGridList from './dataGridList';
import SearchFood from './searchFood';
import CustomMenuPart from './CustomMenuPart';

const MainView = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [lysine, setLysine] = useState();
  const [calories, setCalories] = useState();
  const [proteines, setProteines] = useState();
  const [filterRows, setFilter] = useState([]);
  const apiRef = useGridApiRef();
  const apiRef2 = useGridApiRef();

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('http://localhost:8000/require', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const getData = async () => {
      const data = await sendFetch();
      setRows(data);
      setFilter(data);
    };

    getData();
  }, []);

  return (
    <Stack spacing={3} alignItems="center">
      <SearchFood setFilter={setFilter} rows={rows} />
      <Stack direction="row" spacing={5} alignItems="center">
        <DataGridList filterRows={filterRows} apiRef={apiRef} />

        <FoodListButton
          setProteines={setProteines}
          setLysine={setLysine}
          setCalories={setCalories}
          apiRef={apiRef}
          apiRef2={apiRef2}
          rows2={rows2}
          setRows2={setRows2}
        />
        <CustomMenuPart
          lysine={lysine}
          proteines={proteines}
          calories={calories}
          apiRef2={apiRef2}
          rows2={rows2}
          setLysine={setLysine}
          setProteines={setProteines}
          setCalories={setCalories}
        />
      </Stack>
      <br />
    </Stack>
  );
};

export default MainView;
