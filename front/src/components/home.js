import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Typography variant="h2" color="primary" gutterBottom>
          FoodCop
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Ceci est une application permettant de calculer l'apport nutritionnel
          de menus. Les données proviennent du site :{' '}
          <a href="https://www.data.gouv.fr/fr/datasets/table-de-composition-nutritionnelle-des-aliments-ciqual/">
            CIQUAL
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
