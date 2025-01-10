import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          edge="start"
          color="inherit"
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FoodCop
        </Typography>
        <Button color="inherit" component={Link} to="/customMenu">
          Menu Personnalisé
        </Button>
        <Button color="inherit" component={Link} to="/weekMenus">
          Menus de la Semaine
        </Button>
        <Button color="inherit" component={Link} to="/foodgpt">
          Foodgpt
        </Button>
        <Button color="inherit" component={Link} to="/menus">
          Menus
        </Button>
        <Button color="inherit" component={Link} to="/about">
          À Propos
        </Button>
        <IconButton color="inherit" component={Link} to="/help">
          <HelpIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
