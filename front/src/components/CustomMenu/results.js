import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import SaveMenuDialog from './saveDialog';
import IntakesTable from '../intakesTable';

const Results = ({ intakes, rows }) => {
  const [open, setOpen] = useState(false);
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

  const openSaveDialog = () => {
    setOpen(true);
  };

  return (
    <Stack>
      {keys.length > 0 ? (
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h4" color="white">
            Apports :
          </Typography>
          <Stack alignItems="center" justifyContent="center" spacing={3}>
            <IntakesTable intakes={intakes} />
            <Button
              endIcon={<SaveIcon />}
              variant="contained"
              sx={{
                height: '10%',
                width: '50%',
                justifyContent: 'center',
                backgroundColor: '#423325',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9C6735',
                },
              }}
              onClick={openSaveDialog}
            >
              Sauvegarder le plat
            </Button>
            <SaveMenuDialog
              open={open}
              setOpen={setOpen}
              rows={rows}
              intakes={intakes}
            />
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Results;
