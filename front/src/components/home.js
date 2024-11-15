// Home.js
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Bienvenue sur FoodCop
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          FoodCop est votre application de référence pour calculer l'apport
          nutritionnel de vos menus. Composez vos repas et obtenez
          instantanément des informations nutritionnelles détaillées.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Commencez dès maintenant
          </Typography>
          <Typography variant="body1" paragraph>
            Utilisez notre outil simple et intuitif pour sélectionner des
            aliments et créer vos menus personnalisés. Découvrez comment
            équilibrer votre alimentation en fonction de vos besoins.
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Données Fiables
          </Typography>
          <Typography variant="body1" paragraph>
            Toutes nos données proviennent de sources officielles et fiables.
            Nous utilisons la table de composition nutritionnelle des aliments
            CIQUAL pour vous fournir des informations précises.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Source des données :{' '}
            <a
              href="https://www.data.gouv.fr/fr/datasets/table-de-composition-nutritionnelle-des-aliments-ciqual/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CIQUAL
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
