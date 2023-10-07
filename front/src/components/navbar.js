import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './images/food.png';
import { Stack } from '@mui/material';

const NavBar = () => {
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
            <Stack direction="row" alignItems="center">
              <img
                src={logo}
                style={{
                  width: 45,
                  height: 45,
                  position: 'absolut',
                }}
                alt="logo"
              />
              FoodCop
            </Stack>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/'} style={{ color: 'white' }}>
                Custom Menu
              </Nav.Link>
              <Nav.Link as={Link} to={'/weekMenus'} style={{ color: 'white' }}>
                Menus de la semaine
              </Nav.Link>
              <Nav.Link as={Link} to={'/marmiton'} style={{ color: 'white' }}>
                Marmiton
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
