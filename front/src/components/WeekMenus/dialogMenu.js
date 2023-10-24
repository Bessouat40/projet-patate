import React, { useState, useEffect } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IntakesTable from '../intakesTable';

const DialogMenu = ({ open, setOpen, menu, menus }) => {
  useEffect(() => {
    const initContent = () => {
      const displayMenu = menus[menu];
      let _displayContent = '';
      const ingredients = displayMenu['ingredients'].split('#@&@#');
      const quantite = displayMenu['quantite'].split(',');
      const _intakes = displayMenu['intakes'];
      setIntakes(_intakes);
      ingredients.forEach((ingredient, idx) => {
        _displayContent +=
          ingredient.trim() + ' : ' + quantite[idx] + ' grammes' + '\n';
      });
      setDisplayContent(_displayContent);
    };

    initContent();
  });

  const [displayContent, setDisplayContent] = useState();
  const [intakes, setIntakes] = useState({});

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
          <Typography style={{ whiteSpace: 'pre-line' }}>
            {displayContent}
          </Typography>
          <br />
          <IntakesTable intakes={intakes} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default DialogMenu;
