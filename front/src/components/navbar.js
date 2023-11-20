import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Help from './help';
import HelpIcon from '@mui/icons-material/Help';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        style={{
          background: '#423325',
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to={'/'} style={{ color: 'white' }}>
            <Stack direction="row" alignItems="center" spacing={10}>
              <HomeIcon />
            </Stack>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/customMenu'} style={{ color: 'white' }}>
                Custom Menu
              </Nav.Link>
              <Nav.Link as={Link} to={'/weekMenus'} style={{ color: 'white' }}>
                Menus de la semaine
              </Nav.Link>
              {/* <Nav.Link as={Link} to={'/marmiton'} style={{ color: 'white' }}>
                Marmiton
              </Nav.Link> */}
              <Nav.Link as={Link} to={'/About'} style={{ color: 'white' }}>
                About
              </Nav.Link>
            </Nav>
            <Stack spacing={2} direction="row">
              <HelpIcon
                onClick={onOpen}
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#9C6735',
                  },
                }}
              />
              <Help open={open} setOpen={setOpen} />
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
