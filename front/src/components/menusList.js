import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogMenu from './WeekMenus/dialogMenu';
import SaveMenuDialog from './CustomMenu/saveDialog';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchMenu from './MenusList/searchMenu';

const MenuList = () => {
  const [menus, setMenus] = useState({});
  const [intakes, setIntakes] = useState({});
  const [rows, setRows] = useState({});
  const [displayedMenu, setMenu] = useState();
  const [open, setOpen] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('/api/requireWeekMenus', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const getData = async () => {
      await sendFetch().then((resp) => {
        loadMenus(resp);
      });
    };

    const loadMenus = (resp) => {
      const _menus = resp['menus'];
      const dictMenus = {};
      _menus.forEach((menu) => {
        dictMenus[menu['menu']] = {
          ingredients: menu['ingredients'],
          quantite: menu['quantite'],
          intakes: menu['intakes'],
        };
      });
      setMenus(dictMenus);
      setFilter(dictMenus);
      console.log('menus : ', dictMenus);
    };

    getData();
  }, []);

  const processMenu = (menu) => {
    const _ingredients = menu['ingredients'].split('#@&@#');
    const _quantite = menu['quantite'].split(',');

    return _ingredients.map((ingredient, idx) => (
      <Typography key={idx}>
        <span style={{ color: 'blue' }}>{ingredient.split(':')[0].trim()}</span>
        <span> </span>
        <span>:</span>
        <span> </span>
        <span style={{ color: 'green' }}>{_quantite[idx]} grammes</span>
      </Typography>
    ));
  };

  const openMenu = (menu) => {
    setMenu(menu);
    formatRows(menu);
    setOpen(true);
  };

  const formatRows = (menuName) => {
    const menu = menus[menuName];
    const _ingredients = menu['ingredients'].split('#@&@#');
    const _quantite = menu['quantite'].split(',');

    const intakes = menu['intakes'];

    const rows = [];
    for (let i = 0; i < _ingredients.length; i++) {
      rows.push({ ALIMENT: _ingredients[i], QUANTITY: _quantite[i] });
    }
    setRows(rows);
    setIntakes(intakes);
  };

  const transferMenu = (menu) => {
    formatRows(menu);
    setMenu(menu);
    setOpenSave(true);
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: '30px',
        overflow: 'auto',
      }}
    >
      <Stack
        alignItems="center"
        spacing={3}
        sx={{
          paddingTop: '20px',
          paddingBottom: '20px',
          width: '90%',
          height: '700px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '10px',
          borderColor: 'rgb(249,249,249,0.8)',
          backgroundColor: 'rgb(249,249,249,0.8)',
        }}
      >
        <SearchMenu rows={menus} setFilter={setFilter} />
        {open && (
          <DialogMenu
            menu={displayedMenu}
            menus={menus}
            open={open}
            setOpen={setOpen}
          />
        )}
        {openSave && (
          <SaveMenuDialog
            open={openSave}
            setOpen={setOpenSave}
            rows={rows}
            intakes={intakes}
            menuName={displayedMenu}
          />
        )}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {Object.keys(filter).map((menu) => (
            <Grid
              item
              sm={6}
              md={4}
              key={menu}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  height: '250px',
                  width: '100%',
                  overflow: 'auto',
                }}
              >
                <CardContent>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    direction="row"
                    spacing={10}
                  >
                    <IconButton onClick={() => openMenu(menu)}>
                      <AddIcon />
                    </IconButton>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu}
                    </Typography>
                    <IconButton onClick={() => transferMenu(menu)}>
                      <CalendarMonthIcon />
                    </IconButton>
                  </Stack>

                  {processMenu(menus[menu])}
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default MenuList;
