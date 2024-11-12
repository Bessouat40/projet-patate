import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SaveMenuDialog from './saveDialog';
import IntakesTable from '../intakesTable';

const Results = ({ intakes, rows, userDetails }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [portion, setPortion] = useState(null);

  useEffect(() => {
    setKeys(Object.keys(intakes));
    let _values = [];
    let _portion = {};
    const quantity = extract_quantity(rows);
    Object.keys(intakes).forEach((key) => {
      _values = [..._values, intakes[key]];
      _portion[key] = ((Number(intakes[key]) / quantity) * 100).toFixed(2);
    });
    setPortion(_portion);
    console.log('portion : ', _portion);
  }, [intakes, rows]);

  const extract_quantity = (rows) => {
    let quantity = 0;
    rows.forEach((row) => (quantity = quantity + Number(row['QUANTITY'])));
    return quantity;
  };

  const openSaveDialog = () => {
    setOpen(true);
  };

  return (
    <Stack>
      {keys.length > 0 ? (
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h4">Apports :</Typography>
          <IntakesTable intakes={intakes} />
          <Typography variant="h4">Apports pour 100 g :</Typography>
          <IntakesTable intakes={portion} />
          <Button
            endIcon={<SaveIcon />}
            variant="contained"
            color="primary"
            size="large"
            onClick={openSaveDialog}
          >
            Sauvegarder le plat
          </Button>
          <SaveMenuDialog
            userDetails={userDetails}
            open={open}
            setOpen={setOpen}
            rows={rows}
            intakes={intakes}
          />
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Results;
