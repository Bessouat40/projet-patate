import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainViewCustomMenu from './components/mainViewCustomMenu';
import WeekMenus from './components/mainViewWeekMenus';
import Home from './components/home';
import About from './components/about';
import NavBar from './components/navbar';
import MenuList from './components/menusList';
import Help from './components/help';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customMenu" element={<MainViewCustomMenu />} />
        <Route path="/weekMenus" element={<WeekMenus />} />
        <Route path="/menus" element={<MenuList />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
};

export default App;
