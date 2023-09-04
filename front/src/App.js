import MainView from './components/mainView';
import { Stack } from '@mui/material';
import Marmiton from './components/marmiton';
import React from 'react';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Stack>
              <br />
              <MainView />
            </Stack>
          }
        />
        <Route exact path="/marmiton" element={<Marmiton />} />
      </Routes>
    </Router>
  );
};

export default App;
