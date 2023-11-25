import React, { useState, useEffect } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import FoodListButton from './CustomMenu/foodlistButtons';
import Results from './CustomMenu/results';
import DataGridList from './CustomMenu/dataGridList';
import SearchFood from './CustomMenu/searchFood';
import AnalyzeMenu from './CustomMenu/AnalyzeMenu';
import CircularProgress from '@mui/material/CircularProgress';

const MainViewCustomMenu = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [intakes, setIntakes] = useState({});
  const [filterRows, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useGridApiRef();
  const apiRef2 = useGridApiRef();

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('/api/requireFood', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const getData = async () => {
      const data = await sendFetch();
      setRows(data);
      setFilter(data);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: '30px',
        overflow: 'auto',
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          paddingTop: '20px',
          paddingBottom: '20px',
          width: '90%',
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '10px',
          borderColor: 'rgb(249,249,249,0.8)',
          backgroundColor: 'rgb(249,249,249,0.8)',
          paddingBottom: 2,
        }}
      >
        <SearchFood setFilter={setFilter} rows={rows} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {loading ? (
              <Stack>
                <CircularProgress />
              </Stack>
            ) : (
              <DataGridList filterRows={filterRows} apiRef={apiRef} />
            )}
            <FoodListButton
              setIntakes={setIntakes}
              apiRef={apiRef}
              apiRef2={apiRef2}
              rows2={rows2}
              setRows2={setRows2}
            />
            <AnalyzeMenu
              apiRef2={apiRef2}
              rows2={rows2}
              setIntakes={setIntakes}
              intakes={intakes}
            />
          </div>
        </div>
        <br />
        <Results intakes={intakes} rows={rows2} />
        <br />
      </Stack>
    </Stack>
  );
};

export default MainViewCustomMenu;
