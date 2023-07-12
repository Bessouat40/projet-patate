import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import food from './images/food.png';

const Header = () => {
  return (
    <Stack
      alignItems="center"
      sx={{
        borderRadius: '10px',
        border: 15,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
      }}
      direction="row"
    >
      <img
        src={food}
        style={{
          width: 100,
          height: 100,
          marginLeft: '1.5rem',
          position: 'absolut',
        }}
        alt="logo"
      />
      <Typography color="#9C6735" variant="h1">
        Projet Patate
      </Typography>
    </Stack>
  );
};

export default Header;
