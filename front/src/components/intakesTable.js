import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material';

const IntakesTable = ({ intakes }) => {
  const keys = Object.keys(intakes);
  const values = Object.values(intakes);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key} align="center">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {values.map((value, idx) => (
              <TableCell key={idx} align="center">
                {value} {keys[idx] === 'calories' ? 'kcal' : 'g'}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IntakesTable;
