import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridMenu from './dataGridMenu';

const Panier = ({ rows, api, setRows }) => {
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    try {
      const selectedRows = api.current.getSelectedRows();
      const iterator = selectedRows.values();
      let rows2_ = [...rows];
      for (let idx = 0; idx < selectedRows.size; idx++) {
        const aliment = iterator.next().value.ALIMENT;
        rows2_ = handleDeleteRow(aliment, rows2_);
      }
      setRows(rows2_);
    } catch {
      console.log('Votre liste de menu est vide');
    }
  };

  const handleDeleteRow = (aliment, data) => {
    return data.filter((item) => item.ALIMENT !== aliment);
  };

  return (
    <>
      <IconButton
        color="primary"
        size="large"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={rows.length} color="error">
          <ShoppingBasketIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Votre panier</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DataGridMenu apiRef2={api} rows2={rows} />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Supprimer du menu
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Panier;
