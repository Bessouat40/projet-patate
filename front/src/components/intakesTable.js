import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const IntakesTable = ({ intakes }) => {
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [idxCalories, setIdx] = useState();

  useEffect(() => {
    setKeys(Object.keys(intakes));
    var _values = [];
    Object.keys(intakes).forEach(
      (key) => (_values = [..._values, intakes[key]])
    );
    setValues(_values);
    setIdx(keys.indexOf('calories'));
  }, [intakes]);

  return (
    <Stack maxWidth="95%">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow key={`row-keys`}>
              {keys.map((key) => {
                return (
                  <TableCell align="center" key={`value-${key}`}>
                    {key}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow key={`row-values`}>
              {values.map((value, idx) => {
                if (idx !== idxCalories) {
                  return (
                    <TableCell align="center" key={`value-${idx}`}>
                      {value} g
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell align="center" key={`value-${idx}`}>
                      {value} kcal
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default IntakesTable;
