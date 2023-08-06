import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import food from './images/food.png';

const Header = () => {
  return (
    <Stack alignItems="center" direction="row">
      <Typography color="#FFFFFF" variant="h1">
        Intakelist / FoodCop
      </Typography>
    </Stack>
  );
};

export default Header;
