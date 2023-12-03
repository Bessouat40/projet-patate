import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainViewCustomMenu from './components/mainViewCustomMenu';
import WeekMenus from './components/mainViewWeekMenus';
import Home from './components/home';
import About from './components/about';
import NavBar from './components/navbar';

const PrivateComponent = ({ children, authenticated }) => {
  if (!authenticated) {
    return null;
  }

  return children;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakInstance, setKeycloakInstance] = useState();

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
        <Route
          path="/"
          element={
            <PrivateComponent authenticated={authenticated}>
              <Home />
            </PrivateComponent>
          }
        />
        <Route
          path="/customMenu"
          element={
            <PrivateComponent authenticated={authenticated}>
              <MainViewCustomMenu />
            </PrivateComponent>
          }
        />
        <Route
          path="/weekMenus"
          element={
            <PrivateComponent authenticated={authenticated}>
              <WeekMenus />
            </PrivateComponent>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateComponent authenticated={authenticated}>
              <About />
            </PrivateComponent>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
