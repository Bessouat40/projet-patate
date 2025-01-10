import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DialogMenu from './WeekMenus/dialogMenu';
import SaveMenuDialog from './CustomMenu/saveDialog';
import SearchMenu from './MenusList/searchMenu';

const MenuList = ({ keycloak }) => {
  const [menus, setMenus] = useState({});
  const [intakes, setIntakes] = useState({});
  const [rows, setRows] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [filteredMenus, setFilteredMenus] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = keycloak.token;

        const resp = await fetch('http://localhost:8000/requireWeekMenus', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await resp.json();
        const menusData = data.menus.reduce((acc, menu) => {
          acc[menu.menu] = {
            ingredients: menu.ingredients,
            quantite: menu.quantite,
            intakes: menu.intakes,
          };
          return acc;
        }, {});
        setMenus(menusData);
        setFilteredMenus(menusData);
      } catch (error) {
        console.error('Erreur lors du chargement des menus :', error);
      }
    };

    fetchMenus();
  }, [reload, keycloak.token]);

  const processMenu = (menu) => {
    const ingredients = menu.ingredients.split('#@&@#');
    const quantities = menu.quantite.split(',');

    return ingredients.map((ingredient, idx) => (
      <Typography key={idx} variant="body2">
        <Typography
          component="span"
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          {ingredient.split(':')[0].trim()}
        </Typography>
        {' : '}
        <Typography component="span" sx={{ color: 'secondary.main' }}>
          {quantities[idx]} grammes
        </Typography>
      </Typography>
    ));
  };

  const openMenu = (menuName) => {
    setDisplayedMenu(menuName);
    formatRows(menuName);
    setOpenDialog(true);
  };

  const formatRows = (menuName) => {
    const menu = menus[menuName];
    const ingredients = menu.ingredients.split('#@&@#');
    const quantities = menu.quantite.split(',');

    const rowsData = ingredients.map((ingredient, idx) => ({
      ALIMENT: ingredient,
      QUANTITY: quantities[idx],
    }));

    setRows(rowsData);
    setIntakes(menu.intakes);
  };

  const transferMenu = (menuName) => {
    formatRows(menuName);
    setDisplayedMenu(menuName);
    setOpenSaveDialog(true);
  };

  const onDelete = async () => {
    try {
      const formData = new FormData();
      formData.append('menu_name', displayedMenu);
      await fetch('http://localhost:8000/delete_menu', {
        method: 'POST',
        body: formData,
      });
      setReload(!reload);
      setOpenDialog(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du menu :', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <SearchMenu rows={menus} setFilter={setFilteredMenus} />
      {openDialog && (
        <DialogMenu
          menu={displayedMenu}
          menus={menus}
          open={openDialog}
          setOpen={setOpenDialog}
          onDelete={onDelete}
        />
      )}
      {openSaveDialog && (
        <SaveMenuDialog
          open={openSaveDialog}
          setOpen={setOpenSaveDialog}
          rows={rows}
          intakes={intakes}
          keycloak={keycloak}
          menuName={displayedMenu}
        />
      )}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {Object.keys(filteredMenus).map((menuName) => (
          <Grid item xs={12} sm={6} md={4} key={menuName}>
            <Card variant="outlined">
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <IconButton
                    onClick={() => openMenu(menuName)}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography variant="h6">{menuName}</Typography>
                  <IconButton
                    onClick={() => transferMenu(menuName)}
                    color="secondary"
                  >
                    <CalendarMonthIcon />
                  </IconButton>
                </Stack>
                {processMenu(menus[menuName])}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MenuList;
