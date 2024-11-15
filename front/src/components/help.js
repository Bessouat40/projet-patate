import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import documentation from '../resources/doc_fr.md';

const ContentWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: '70vh',
  overflowY: 'auto',
}));

const Help = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const [docContent, setDocContent] = useState('');

  useEffect(() => {
    fetch(documentation)
      .then((response) => response.text())
      .then((text) => setDocContent(text));
  }, []);

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">Aide</Typography>
        <IconButton
          aria-label="fermer"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <ContentWrapper>
          <ReactMarkdown>{docContent}</ReactMarkdown>
        </ContentWrapper>
      </DialogContent>
      <Button onClick={handleClose} color="primary">
        Fermer
      </Button>
    </Dialog>
  );
};

export default Help;
