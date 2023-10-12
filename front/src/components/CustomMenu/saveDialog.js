import React, { useState } from 'react';
import { Stack, IconButton, Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const SaveMenuDialog = ({ open, setOpen, rows }) => {
  const [menu, setMenu] = useState('');
  const [jour, setJour] = useState('lundi');
  const [phase, setPhase] = useState('matin');

  const _joursSemaine = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];

  const _phase = ['matin', 'midi', 'soir'];

  const onClose = () => {
    setOpen(false);
  };

  const onSaveMenu = async () => {
    const formData = new FormData();
    formData.append('menu', menu);
    formData.append('jour', jour);
    formData.append('phase', phase);
    const menuDetails = JSON.stringify(rows);
    formData.append('menuDetails', menuDetails);
    await fetch('http://localhost:8000/saveMenu', {
      body: formData,
      method: 'POST',
    });
    setOpen(false);
  };

  return (
    <Stack>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth={true}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
          >
            {'Veuillez rentrer le nom du plat'}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={5}
            justifyContent="center"
            alignItems="center"
            direction="row"
          >
            <TextField
              label="Nom du plat"
              onChange={(e) => {
                setMenu(e.target.value);
              }}
            />
            <Select
              onChange={(event) => setJour(event.target.value)}
              defaultValue="lundi"
            >
              {_joursSemaine.map((jour) => (
                <MenuItem key={jour} value={jour}>
                  {jour}
                </MenuItem>
              ))}
            </Select>
            <Select
              onChange={(event) => setPhase(event.target.value)}
              defaultValue="matin"
            >
              {_phase.map((phase) => (
                <MenuItem key={phase} value={phase}>
                  {phase}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions>
          <IconButton
            size="large"
            onClick={onSaveMenu}
            sx={{
              justifyContent: 'center',
              color: '#423325',
              '&:hover': {
                color: '#9C6735',
              },
            }}
          >
            <SaveIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default SaveMenuDialog;
