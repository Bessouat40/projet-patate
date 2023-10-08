import React, { useState, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchBar from 'material-ui-search-bar';
import Tooltip from '@mui/material/Tooltip';

const columns = [
  {
    field: 'ALIMENT',
    headerName: 'ALIMENT',
    width: 200,
    editable: false,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span className="csutable-cell-trucate">{params.value}</span>
      </Tooltip>
    ),
  },
  {
    field: 'QUANTITY',
    headerName: 'QUANTITY (g)',
    width: 150,
    editable: true,
  },
];

const columns2 = [
  {
    field: 'ALIMENT',
    headerName: 'ALIMENT',
    width: 200,
    editable: false,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span className="csutable-cell-trucate">{params.value}</span>
      </Tooltip>
    ),
  },
  {
    field: 'QUANTITY',
    headerName: 'QUANTITY (g)',
    width: 150,
    editable: false,
  },
];

const DataList = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [lysine, setLysine] = useState();
  const [calories, setCalories] = useState();
  const [proteines, setProteines] = useState();
  const [filterRows, setFilter] = useState([]);
  const [searched, setSearched] = useState('');
  const apiRef = useGridApiRef();
  const apiRef2 = useGridApiRef();

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('http://localhost:8000/require', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const getData = async () => {
      const data = await sendFetch();
      setRows(data);
      setFilter(data);
    };

    getData();
  }, []);

  const onTransfer = () => {
    setProteines();
    setLysine();
    setCalories();
    const selectedRows = apiRef.current.getSelectedRows();
    const iterator = selectedRows.values();
    const values = rows2.map((value) => {
      return value['ALIMENT'];
    });
    for (var idx = 0; idx < selectedRows.size; idx++) {
      const value = iterator.next().value;
      apiRef.current.selectRow(value['id'], null, true);
      if (values.includes(value['ALIMENT'])) {
        const rows2_ = handleDeleteRow(value['id'], rows2);
        setRows2(rows2_);
      }
      if (!rows2.includes(value)) setRows2((prevRows) => [...prevRows, value]);
    }
  };

  const handleDeleteRow = (id, data) => {
    const filteredElements = data.filter(function (item, index) {
      return item.id !== id;
    });
    return filteredElements;
  };

  const onDelete = () => {
    try {
      setProteines();
      setLysine();
      setCalories();
      const selectedRows = apiRef2.current.getSelectedRows();
      const iterator = selectedRows.values();
      var rows2_ = rows2;
      for (var idx = 0; idx < selectedRows.size; idx++) {
        const id = iterator.next().value.id;
        rows2_ = handleDeleteRow(id, rows2_);
      }
      setRows2(rows2_);
    } catch {
      alert('Your menu list is empty');
    }
  };

  const requestSearchFood = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row['ALIMENT'].toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilter(filteredRows);
  };

  const cancelSearchFood = () => {
    setSearched('');
    requestSearchFood(searched);
  };

  const onSendMenu = async () => {
    const menu = JSON.stringify(rows2);
    const resp = await fetch('http://localhost:8000/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: menu,
    });
    const _intakes = await resp.json();
    const _lysine = _intakes['lysine'];
    const _calories = _intakes['calories'];
    const _proteines = _intakes['proteines'];
    setLysine(_lysine);
    setProteines(_proteines);
    setCalories(_calories);
  };

  return (
    <Stack
      spacing={3}
      alignItems="center"
      sx={{
        Height: '100%',
        width: '90%',
        borderRadius: '10px',
        border: 15,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
      }}
    >
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearchFood(searchVal)}
        onCancelSearch={() => cancelSearchFood()}
        placeholder="Search a food"
      />

      <Stack
        direction="row"
        spacing={5}
        alignItems="center"
        sx={{
          width: '90%',
          borderRadius: '10px',
          border: 15,
          borderColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
        }}
      >
        {filterRows.length > 0 ? (
          <DataGrid
            apiRef={apiRef}
            rows={filterRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableColumnMenu
            checkboxSelection
            disableRowSelectionOnClick
          />
        ) : (
          <Typography>
            We don't have any food that match your search...
          </Typography>
        )}

        <Stack spacing={5}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              height: '10%',
              justifyContent: 'center',
              backgroundColor: '#ECA059',
              '&:hover': {
                backgroundColor: '#9C6735',
              },
            }}
            onClick={onTransfer}
          >
            Add to Menu
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            sx={{
              height: '10%',
              justifyContent: 'center',
              backgroundColor: '#ECA059',
              '&:hover': {
                backgroundColor: '#9C6735',
              },
            }}
            onClick={onDelete}
          >
            Remove food
          </Button>
        </Stack>
        <Stack
          spacing={5}
          alignItems="center"
          sx={{ width: '45%', maxHeight: '100%' }}
        >
          <Stack direction="row" spacing={5} alignItems="center">
            <Typography variant="h4" color="#9C6735">
              Menu List
            </Typography>
            <ShoppingBasketIcon fontSize="large" sx={{ color: '#9C6735' }} />
          </Stack>
          {rows2.length > 0 ? (
            <DataGrid
              apiRef={apiRef2}
              rows={rows2}
              columns={columns2}
              disableColumnMenu
              sx={{ width: '100%' }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            <Typography color="#9C6735">Please select food</Typography>
          )}
          <Button
            variant="contained"
            sx={{
              height: '10%',
              width: '50%',
              justifyContent: 'center',
              backgroundColor: '#ECA059',
              '&:hover': {
                backgroundColor: '#9C6735',
              },
            }}
            onClick={onSendMenu}
          >
            Analyze Menu
          </Button>
          {lysine ? (
            <Typography>
              {' '}
              Lysine : {lysine} mg / Proteines : {proteines} g / Calories :{' '}
              {calories}
            </Typography>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DataList;
