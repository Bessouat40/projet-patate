import React, { useState, useEffect } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IntakesTable from '../intakesTable';

const DialogMenu = ({ open, setOpen, menu, menus }) => {
  useEffect(({ open, setOpen, menu, menus }) => {
    const initContent = (pass) => {
      if (pass) {
        return null;
      }
      const displayMenu = menus[menu];
      let _ingredients_liste = [];
      let _quantite_liste = [];
      const _ingredients = displayMenu['ingredients'].split('#@&@#');
      const _quantite = displayMenu['quantite'].split(',');
      const _intakes = displayMenu['intakes'];
      setIntakes(_intakes);
      _ingredients.forEach((ingredient, idx) => {
        _quantite_liste = [..._quantite_liste, _quantite[idx]];
        _ingredients_liste = [..._ingredients_liste, ingredient];
      });
      setIngredients(_ingredients_liste);
      setQuantite(_quantite_liste);
    };
    try {
      initContent(false);
    } catch {
      initContent(true);
    }
  }, []);

  const [intakes, setIntakes] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantite, setQuantite] = useState([]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <Dialog
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
          >
            {'Votre menu du jour'}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {ingredients
            ? ingredients.map((ingredient, idx) => (
                <Typography key={idx}>
                  <span style={{ color: 'blue' }}>
                    {ingredient.split(':')[0].trim()}
                  </span>
                  <span> </span>
                  <span>:</span>
                  <span> </span>
                  <span style={{ color: 'green' }}>
                    {quantite[idx]} grammes
                  </span>
                </Typography>
              ))
            : null}
          <br />
          <IntakesTable intakes={intakes} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default DialogMenu;
