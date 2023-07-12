import DataList from './components/data_grid';
import { Stack } from '@mui/material';
import Header from './components/header';

const App = () => {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      <Header />
      <DataList />
    </Stack>
  );
};

export default App;
