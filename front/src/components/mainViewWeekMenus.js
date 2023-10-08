import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip, Typography } from '@mui/material';

const WeekMenus = () => {
  const [rows, setRows] = useState();
  const joursSemaine = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('http://localhost:8000/requireWeekMenus', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    /**
     * Receive data to display
     */
    const getData = async () => {
      const data = await sendFetch();
      const row = [];
      data.forEach((d) => {
        row.push(d);
      });
      formatData(row);
    };

    getData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#423325',
      color: 'white',
      borderRight: '1px solid white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const onClickMenu = (menu, phase, menuIdx) => {
    alert('Menu du ' + joursSemaine[menuIdx] + ' ' + phase + ' : ' + menu);
  };

  const formatData = (_rows) => {
    const phaseMenus = { matin: [], midi: [], soir: [] };

    _rows.forEach((dict) => {
      phaseMenus[dict['phase']].push(dict['menu']);
    });
    setRows(phaseMenus);
  };

  return (
    <Stack
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h2" color="white">
        Vos menus de la semaine :
      </Typography>
      {rows ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow key="columns">
                <StyledTableCell key="null" align="center"></StyledTableCell>
                {joursSemaine.map((jour) => (
                  <StyledTableCell key={`header-${jour}`} align="center">
                    {jour}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(rows).map((phase) => (
                <TableRow key={`row-${phase}`}>
                  <TableCell
                    sx={{ backgroundColor: '#423325', color: 'white' }}
                    align="center"
                    key={`cell-phase-${phase}`}
                  >
                    {phase}
                  </TableCell>
                  {rows[phase].map((menu, menuIdx) => (
                    <Tooltip
                      key={`tooltip-${phase}-${menuIdx}`}
                      title="Afficher le repas"
                    >
                      <TableCell
                        onClick={() => onClickMenu(menu, phase, menuIdx)}
                        key={`cell-${phase}-${menuIdx}`}
                        sx={{
                          borderRight: '1px solid grey',
                          borderBottom: '1px solid grey',
                          '&:hover': {
                            backgroundColor: '#E0DFDE',
                            cursor: 'pointer',
                          },
                        }}
                        align="center"
                      >
                        {menu}
                      </TableCell>
                    </Tooltip>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
};

export default WeekMenus;
