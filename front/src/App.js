import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import MainViewCustomMenu from './components/mainViewCustomMenu';
import WeekMenus from './components/mainViewWeekMenus';
import Home from './components/home';
import About from './components/about';
import NavBar from './components/navbar';
import MenuList from './components/menusList';
import Help from './components/help';
import { keycloak } from './keycloak';

const ProtectedRoute = ({ authenticated, children }) => {
  if (authenticated === null) {
    return <div>Chargement...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const auth = await keycloak.init({ onLoad: 'login-required' });
        console.log('Keycloak init:', auth);
        setAuthenticated(auth);
      } catch (error) {
        console.error('Keycloak initialization failed', error);
        setAuthenticated(false);
      } finally {
        setKeycloakInitialized(true);
      }
    };

    initKeycloak();
  }, []);

  if (!keycloakInitialized) {
    return <div>Chargement de l'application...</div>;
  }

  return (
    <Router>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        keycloakInstance={keycloak}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/customMenu"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <MainViewCustomMenu keycloak={keycloak} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weekMenus"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <WeekMenus keycloak={keycloak} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menus"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <MenuList keycloak={keycloak} />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
};

export default App;
