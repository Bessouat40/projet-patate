import React, { useState, useEffect } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import {
  Container,
  Box,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Panier from './CustomMenu/basket';
import Results from './CustomMenu/results';
import DataGridList from './CustomMenu/dataGridList';
import SearchFood from './CustomMenu/searchFood';
import AnalyzeMenu from './CustomMenu/AnalyzeMenu';

const MainViewCustomMenu = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [intakes, setIntakes] = useState({});
  const [filterRows, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState('');
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Panier rows={rows2} api={apiRef2} setRows={setRows2} />
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Créer un menu personnalisé
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Groupes</InputLabel>
            <Select value={group} onChange={handleChangeGroup} label="Groupes">
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <SearchFood setFilter={setFilter} rows={rows} />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGridList
            filterRows={filterRows}
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
      </Paper>
    </Container>
  );
};

export default MainViewCustomMenu;
