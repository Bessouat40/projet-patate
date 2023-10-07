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
  const phase = ['matin', 'midi', 'soir'];

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
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const formatData = (_rows) => {
    const phaseMenus = { matin: [], midi: [], soir: [] };

    _rows.forEach((dict) => {
      const { jour, menu, phase } = dict;
      phaseMenus[phase].push(menu);
    });

    Object.keys(phaseMenus).map((phase) => {});
    setRows(phaseMenus);
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        marginTop: '20px',
      }}
    >
      {rows ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"></StyledTableCell>
                {joursSemaine.map((jour) => (
                  <StyledTableCell align="center">{jour}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(rows).map((phase) => (
                <TableRow key={phase}>
                  <StyledTableCell align="center">{phase}</StyledTableCell>
                  {rows[phase].map((menu) => (
                    <TableCell align="center">{menu}</TableCell>
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
