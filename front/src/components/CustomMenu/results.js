import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import SaveMenuDialog from './saveDialog';

const Results = ({ intakes, rows }) => {
  const [open, setOpen] = useState(false);

  const openSaveDialog = () => {
    setOpen(true);
  };

  return (
    <Stack>
      {Object.keys(intakes).length > 0 ? (
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h4" color="white">
            Apports :
          </Typography>
          <Stack alignItems="center" justifyContent="center" spacing={3}>
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
                          <TableCell align="center" key={`value-${intake}`}>
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
                          <TableCell align="center" key={`value-${intake}`}>
                            {intakes[intake]} g
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
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
            <SaveMenuDialog open={open} setOpen={setOpen} rows={rows} />
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Results;
