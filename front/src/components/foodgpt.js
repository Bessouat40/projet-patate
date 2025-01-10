import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import DataGridListFoodGpt from './foodgpt/datagridList';
import SearchFood from './CustomMenu/searchFood';

const UploadAndDisplay = ({ selected, setSelected }) => {
  const [file, setFile] = useState(null);
  const [filterRows, setFilterRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiRef = useGridApiRef();
  const [rows, setRows] = useState([]);
  const [filteredSearchRows, setFilteredSearchRows] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const resp = await fetch('http://localhost:8000/requireFood', {
        method: 'POST',
      });
      const data = await resp.json();
      setRows(data);
    };
    fetchIngredients();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const addIngredientFromSearch = (ingredient) => {
    const newId =
      filterRows.length > 0 ? filterRows[filterRows.length - 1].id + 1 : 1;
    const newIngredient = {
      id: newId,
      ALIMENT: ingredient['ALIMENT'],
      QUANTITY: 0,
    };
    // Vérifier si l'ingrédient est déjà dans le tableau
    if (!filterRows.some((row) => row.ALIMENT === ingredient['ALIMENT'])) {
      setFilterRows([...filterRows, newIngredient]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier avant d'envoyer.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8001/foodgpt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      const data = await response.json();

      // Formater les données pour le DataGrid
      const formattedRows = data.relevant_ingredients.map(
        (ingredient, index) => ({
          id: index + 1,
          ALIMENT: ingredient,
          QUANTITY: 0, // Quantité initiale par défaut
        })
      );

      setFilterRows(formattedRows);
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Uploader une Image et Afficher les Résultats
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <input type="file" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Analyser l'image
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filterRows.length > 0 ? (
        <Stack sx={{ mt: 4 }}>
          <Box sx={{ mt: 4 }}>
            <SearchFood setFilter={setFilteredSearchRows} rows={rows} />
          </Box>
          {filteredSearchRows.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <List>
                {filteredSearchRows.map((ingredient) => (
                  <ListItem key={ingredient['ALIMENT']}>
                    <ListItemButton
                      onClick={() => addIngredientFromSearch(ingredient)}
                    >
                      <ListItemText primary={ingredient['ALIMENT']} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          <DataGridListFoodGpt
            setFilterRows={setFilterRows}
            filterRows={filterRows}
            selected={selected}
            setSelected={setSelected}
            apiRef={apiRef}
          />
        </Stack>
      ) : (
        <Typography sx={{ mt: 4 }}>Aucun résultat à afficher.</Typography>
      )}
    </Paper>
  );
};

export default UploadAndDisplay;
