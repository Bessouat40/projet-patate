import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SaveMenuDialog from './saveDialog';
import IntakesTable from '../intakesTable';

const Results = ({ intakes, rows }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeys(Object.keys(intakes));
    var _values = [];
    Object.keys(intakes).forEach(
      (key) => (_values = [..._values, intakes[key]])
    );
  }, [intakes]);

  const openSaveDialog = () => {
    setOpen(true);
  };

  return (
    <Stack>
      {keys.length > 0 ? (
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h4">Apports :</Typography>
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
