import MainViewCustomMenu from './components/mainViewCustomMenu';
import MainViewMarmiton from './components/mainViewMarmiton';
import React from 'react';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeekMenus from './components/weekMenus';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<MainViewCustomMenu />} />
        <Route exact path="/marmiton" element={<MainViewMarmiton />} />
        <Route exact path="/weekMenus" element={<WeekMenus />} />
      </Routes>
    </Router>
  );
};

export default App;
