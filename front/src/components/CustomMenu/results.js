import React from 'react';
import { Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Results = ({ intakes }) => {
  return (
    <Stack>
      {Object.keys(intakes).length > 0 ? (
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h4" color="white">
            Apports :
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {Object.keys(intakes).map((intake) => {
                  if (intake === 'calories') {
                    return (
                      <TableRow key={`row-${intake}`}>
                        <TableCell align="center" key={`cell-${intake}`}>
                          {intake}
                        </TableCell>
                        <TableCell
                          align="center"
                          key={`cell-${intakes[intake]}`}
                        >
                          {intakes[intake]} kcal
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return (
                      <TableRow key={`row-${intake}`}>
                        <TableCell align="center" key={`cell-${intake}`}>
                          {intake}
                        </TableCell>
                        <TableCell
                          align="center"
                          key={`cell-${intakes[intake]}`}
                        >
                          {intakes[intake]} g
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Results;
