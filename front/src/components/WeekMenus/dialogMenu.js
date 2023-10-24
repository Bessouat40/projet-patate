import React, { useState, useEffect } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DialogMenu = ({ open, setOpen, menu, menus }) => {
  useEffect(() => {
    const initContent = () => {
      const displayMenu = menus[menu];
      let _displayContent = '';
      const ingredients = displayMenu['ingredients'].split('#@&@#');
      const quantite = displayMenu['quantite'].split(',');
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
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default DialogMenu;
