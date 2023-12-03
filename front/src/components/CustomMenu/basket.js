import React, { useState } from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DataGridMenu from './dataGridMenu';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';

const Panier = ({ rows, api, setRows }) => {
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    try {
      const selectedRows = api.current.getSelectedRows();
      const iterator = selectedRows.values();
      var rows2_ = [...rows];
      for (var idx = 0; idx < selectedRows.size; idx++) {
        const aliment = iterator.next().value.ALIMENT;
        rows2_ = handleDeleteRow(aliment, rows2_);
      }
      setRows(rows2_);
    } catch {
      alert('Your menu list is empty');
    }
  };

  const handleDeleteRow = (aliment, data) => {
    const filteredElements = data.filter((item, index) => {
      return item.ALIMENT !== aliment;
    });
    return filteredElements;
  };

  return (
    <Stack>
      <IconButton
        variant="contained"
        size="large"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          borderRadius: '30px',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#9C6735',
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={rows.length} color="error">
          <ShoppingBasketIcon sx={{ color: '#423325' }} />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth={true}
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Stack
            spacing={10}
            alignItems="center"
            justifyContent="center"
            direction="row"
          >
            {'Voici votre panier'}
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={5} justifyContent="center" alignItems="center">
            <DataGridMenu apiRef2={api} rows2={rows} />
            <Button
              variant="contained"
              endIcon={<DeleteIcon />}
              sx={{
                height: '10%',
                justifyContent: 'center',
                backgroundColor: '#423325',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9C6735',
                },
              }}
              onClick={onDelete}
            >
              Supprimer du menu
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Panier;
