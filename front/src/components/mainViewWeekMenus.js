import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import DialogMenu from './WeekMenus/dialogMenu';
import WeekIntakeDashboard from './WeekMenus/weekDashboard';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRight: `1px solid ${theme.palette.common.white}`,
  textAlign: 'center',
  fontSize: 16,
}));

const WeekMenus = ({ keycloak }) => {
  const [rows, setRows] = useState(null);
  const [dayMenu, setDayMenu] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [menus, setMenus] = useState({});
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const joursSemaine = useMemo(
    () => [
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
      'dimanche',
    ],
    []
  );

  const fetchData = useCallback(async () => {
    try {
      const token = keycloak.token;

      const response = await fetch('http://localhost:8000/requireWeekMenus', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const { menus: fetchedMenus, weekMenus } = data;

      const menusDict = fetchedMenus.reduce((acc, menu) => {
        acc[menu.menu] = {
          ingredients: menu.ingredients,
          quantite: menu.quantite,
          intakes: menu.intakes,
        };
        return acc;
      }, {});
      setMenus(menusDict);

      const phaseMenus = { matin: {}, midi: {}, soir: {} };
      weekMenus.forEach((item) => {
        const dayIndex = joursSemaine.indexOf(item.jour);
        if (dayIndex !== -1) {
          phaseMenus[item.phase][dayIndex] = item.menu;
        }
      });
      setRows(phaseMenus);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }, [joursSemaine, keycloak.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reload]);

  const handleMenuClick = (menu, dayIndex, phase) => {
    setDayMenu(menu);
    setSelectedDayIndex(dayIndex);
    setSelectedPhase(phase);
    setOpen(true);
  };

  const onDelete = async () => {
    try {
      const formData = new FormData();
      formData.append('menu_name', dayMenu);
      formData.append('phase', selectedPhase);
      formData.append('jour', joursSemaine[selectedDayIndex]);
      await fetch('http://localhost:8000/delete_week_menu', {
        body: formData,
        method: 'POST',
      });
      setReload(!reload);
      setOpen(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du menu :', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {open && (
        <DialogMenu
          menu={dayMenu}
          menus={menus}
          open={open}
          setOpen={setOpen}
          onDelete={onDelete}
        />
      )}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Vos menus de la semaine
        </Typography>
        {rows ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Phase</StyledTableCell>
                    {joursSemaine.map((jour) => (
                      <StyledTableCell key={jour} align="center">
                        {jour.charAt(0).toUpperCase() + jour.slice(1)}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {['matin', 'midi', 'soir'].map((phase) => (
                    <TableRow key={phase}>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'common.white',
                          fontWeight: 'bold',
                        }}
                      >
                        {phase.charAt(0).toUpperCase() + phase.slice(1)}
                      </TableCell>
                      {joursSemaine.map((_, dayIndex) => {
                        const menu = rows[phase][dayIndex];
                        return (
                          <TableCell
                            key={`${phase}-${dayIndex}`}
                            align="center"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                            onClick={() =>
                              handleMenuClick(menu, dayIndex, phase)
                            }
                          >
                            {menu}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <WeekIntakeDashboard
              rows={rows}
              menus={menus}
              joursSemaine={joursSemaine}
            />
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Typography>Chargement des menus...</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default WeekMenus;
