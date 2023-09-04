import MainView from './components/mainView';
import { Stack } from '@mui/material';
import Header from './components/header';
import Marmiton from './components/marmiton';

const App = () => {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      <Header />
      <MainView />
      {/* <Marmiton /> */}
    </Stack>
  );
};

export default App;
