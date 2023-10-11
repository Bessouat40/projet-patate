import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Home = () => {
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
      <Typography
        variant="h1"
        color="#423325"
        style={{
          background: '#423325',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'skia',
        }}
      >
        FoodCop
      </Typography>
      <Typography>
        Ceci est une application permettant de calculer l'apport nutritique de
        menus. Les datas viennent du site :
        https://www.data.gouv.fr/fr/datasets/table-de-composition-nutritionnelle-des-aliments-ciqual/#/resources
      </Typography>
    </Stack>
  );
};

export default Home;
