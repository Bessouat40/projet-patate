import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const Help = ({ open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Stack>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Stack spacing={5}>
            <Typography>Test du module help</Typography>
            <Button onClick={onClose}>Fermer</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Help;
