import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainViewCustomMenu from './components/mainViewCustomMenu';
import WeekMenus from './components/mainViewWeekMenus';
import Home from './components/home';
import About from './components/about';
import NavBar from './components/navbar';
import MenuList from './components/menusList';
import Help from './components/help';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakInstance, setKeycloakInstance] = useState();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const keycloakConfig = {
      url: 'http://localhost:8080',
      realm: 'foodcop-realm',
      clientId: 'foodcop',
    };

    const _keycloakInstance = new Keycloak(keycloakConfig);

    _keycloakInstance.init({ onLoad: 'login-required' }).then((auth) => {
      console.log('auth : ' + auth);
      setAuthenticated(auth);
      if (auth) {
        setUserDetails(keycloak.tokenParsed);
      }
    });

    setKeycloakInstance(_keycloakInstance);
    return () => {
      if (keycloakInstance) {
        keycloakInstance.logout();
      }
    };
  }, []);
  return (
    <Router>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        keycloakInstance={keycloakInstance}
      />
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
