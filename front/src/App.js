import MainViewCustomMenu from './components/mainViewCustomMenu';
import Marmiton from './components/marmiton';
import React from 'react';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<MainViewCustomMenu />} />
        <Route exact path="/marmiton" element={<Marmiton />} />
      </Routes>
    </Router>
  );
};

export default App;
