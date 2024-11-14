import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          À Propos de Nous
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Bienvenue sur FoodCop, votre application de référence pour le calcul
          des apports nutritionnels de vos menus. Nous sommes une équipe
          passionnée dédiée à vous fournir les outils nécessaires pour une
          alimentation saine et équilibrée.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Notre Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Nous croyons que la nutrition joue un rôle essentiel dans le
            bien-être et la santé de chacun. Notre mission est de simplifier
            l'accès aux informations nutritionnelles afin que vous puissiez
            prendre des décisions éclairées sur votre alimentation quotidienne.
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Technologies Utilisées
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">ReactJS</Typography>
              <Typography variant="body2">
                Pour le développement de l'interface utilisateur, offrant une
                expérience interactive et réactive.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Python & FastAPI</Typography>
              <Typography variant="body2">
                Pour le développement de notre API REST, garantissant des
                performances élevées et une scalabilité.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">PostgreSQL</Typography>
              <Typography variant="body2">
                Pour la gestion fiable et sécurisée de nos données.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Docker</Typography>
              <Typography variant="body2">
                Pour la conteneurisation de notre application, assurant une
                déploiement flexible et une maintenance facilitée.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Notre Équipe
          </Typography>
          <Typography variant="body1" paragraph>
            Notre équipe est composée de professionnels expérimentés dans le
            développement web, la nutrition et la gestion de bases de données.
            Nous travaillons ensemble pour vous offrir une application fiable et
            conviviale.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
