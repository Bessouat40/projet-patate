import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IntakesTable from '../intakesTable';

const DialogMenu = ({ open, setOpen, menu, menus, onDelete }) => {
  const [intakes, setIntakes] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    if (menu && menus[menu]) {
      const displayMenu = menus[menu];
      const ingredientList = displayMenu.ingredients.split('#@&@#');
      const quantityList = displayMenu.quantite.split(',');
      setIntakes(displayMenu.intakes);
      setIngredients(ingredientList);
      setQuantities(quantityList);
    }
  }, [menu, menus]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="dialog-menu-title"
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Votre menu</Typography>
          <Box>
            <IconButton onClick={onDelete} aria-label="supprimer le menu">
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton onClick={handleClose} aria-label="fermer le dialogue">
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          {ingredients.map((ingredient, idx) => (
            <Typography key={idx} variant="body1">
              <Box
                component="span"
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                {ingredient.split(':')[0].trim()}
              </Box>
              {' : '}
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {quantities[idx]} grammes
              </Box>
            </Typography>
          ))}
        </Box>
        <IntakesTable intakes={intakes} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogMenu;
