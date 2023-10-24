import React from 'react';
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
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="lg">
        <DialogContent>
          <Stack spacing={5}>
            <video controls>
              <source src="/demo.mov" type="video/mp4" />
            </video>
            <Button onClick={onClose}>Fermer</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Help;
