import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const SaveMenuDialog = ({ open, setOpen, rows, intakes, menuName = '' }) => {
  const [menu, setMenu] = useState(menuName);
  const [jour, setJour] = useState('lundi');
  const [phase, setPhase] = useState('matin');
  const isMenuNameEditable = menuName === '';

  const joursSemaine = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];

  const phases = ['matin', 'midi', 'soir'];

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveMenu = async () => {
    const formData = new FormData();
    formData.append('menu', menu);
    formData.append('jour', jour);
    formData.append('phase', phase);
    formData.append('intakes', JSON.stringify(intakes));
    formData.append('menuDetails', JSON.stringify(rows));

    try {
      await fetch('/api//saveMenu', {
        method: 'POST',
        body: formData,
      });
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du menu :", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Enregistrer le menu</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {isMenuNameEditable && (
            <TextField
              label="Nom du plat"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              fullWidth
            />
          )}
          <FormControl fullWidth>
            <InputLabel>Jour</InputLabel>
            <Select
              value={jour}
              onChange={(e) => setJour(e.target.value)}
              label="Jour"
            >
              {joursSemaine.map((jourItem) => (
                <MenuItem key={jourItem} value={jourItem}>
                  {jourItem.charAt(0).toUpperCase() + jourItem.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Phase</InputLabel>
            <Select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              label="Phase"
            >
              {phases.map((phaseItem) => (
                <MenuItem key={phaseItem} value={phaseItem}>
                  {phaseItem.charAt(0).toUpperCase() + phaseItem.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveMenu}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveMenuDialog;
