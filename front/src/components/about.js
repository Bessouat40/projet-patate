import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const About = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={5}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxEight: '90%',
        borderRadius: '10px',
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Typography>Ceci est la partie ABOUT de notre application.</Typography>
      <Typography>Nous utilisons :</Typography>
      <Typography>- ReactJS pour le développement IHM,</Typography>
      <Typography>- PostgreSQL pour la partie base de données,</Typography>
      <Typography>
        - Docker pour la conteneurisation de notre application,
      </Typography>
      <Typography>- Python pour le développement de notre RestAPI</Typography>
    </Stack>
  );
};

export default About;
