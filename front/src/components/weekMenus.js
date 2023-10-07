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
      setRows(row);
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

  const formatData = () => {};

  return (
    <Stack sx={{ height: '100vh', overflow: 'hidden', marginTop: '20px' }}>
      <Stack spacing={5} alignItems="center">
        <Stack
          spacing={2}
          sx={{
            maxHeight: 700,
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: 15,
            borderColor: '#FFFFFF',
          }}
        >
          {rows ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Jour</StyledTableCell>
                    <StyledTableCell align="center">
                      Phase de la journée
                    </StyledTableCell>
                    <StyledTableCell align="center">Menu</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.jour}
                      </TableCell>
                      <TableCell align="center">{row.phase}</TableCell>
                      <TableCell align="center">{row.menu}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WeekMenus;
