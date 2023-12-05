import React, { useState, useEffect } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import Panier from './CustomMenu/basket';
import Results from './CustomMenu/results';
import DataGridList from './CustomMenu/dataGridList';
import SearchFood from './CustomMenu/searchFood';
import AnalyzeMenu from './CustomMenu/AnalyzeMenu';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MainViewCustomMenu = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [intakes, setIntakes] = useState({});
  const [filterRows, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState('');
  const apiRef = useGridApiRef();
  const apiRef2 = useGridApiRef();

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('http://localhost:8000/requireFood', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const getData = async () => {
      const data = await sendFetch();
      const uniqueGroups = [
        ...new Set(data.flatMap((item) => item['GROUPE'].toString())),
      ].sort();
      setRows(
        data.sort((a, b) => {
          if (a['ALIMENT'] < b['ALIMENT']) {
            return -1;
          }
          if (a['ALIMENT'] > b['ALIMENT']) {
            return 1;
          }
          return 0;
        })
      );
      setFilter(data);
      setLoading(false);
      setGroups(uniqueGroups);
    };

    getData();
  }, []);

  const filterGroup = (data, groupName) => {
    return data.filter((food) => food['GROUPE'] === groupName);
  };

  const handleChangeGroup = (event) => {
    const group = event.target.value;
    const filterData = filterGroup(rows, group);
    setGroup(group);
    setFilter(filterData);
  };

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
        }}
      >
        <Panier rows={rows2} api={apiRef2} setRows={setRows2} />
        <FormControl
          sx={{
            backgroundColor: 'white',
            width: '30%',
            borderRadius: '5px',
          }}
        >
          <InputLabel>Groupes</InputLabel>
          <Select
            value={group}
            onChange={handleChangeGroup}
            autoWidth
            label="Groupes"
          >
            {groups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SearchFood setFilter={setFilter} rows={rows} />
        {loading ? (
          <Stack>
            <CircularProgress />
          </Stack>
        ) : (
          <DataGridList
            filterRows={filterRows}
            apiRef={apiRef}
            selected={rows2}
            setSelected={setRows2}
          />
        )}
        <AnalyzeMenu
          apiRef2={apiRef2}
          rows2={rows2}
          setIntakes={setIntakes}
          intakes={intakes}
        />
        <Results intakes={intakes} rows={rows2} />
      </Stack>
    </Stack>
  );
};

export default MainViewCustomMenu;
