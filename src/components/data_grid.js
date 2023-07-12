import React, { useState, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DataList = () => {
  const [rows2, setRows2] = useState([]);
  const apiRef = useGridApiRef();
  const apiRef2 = useGridApiRef();

  const onTransfer = () => {
    const selectedRows = apiRef.current.getSelectedRows();
    const iterator = selectedRows.values();
    for (var idx = 0; idx < selectedRows.size; idx++) {
      const value = iterator.next().value;
      if (!rows2.includes(value)) setRows2((prevRows) => [...prevRows, value]);
    }
  };

  const handleDeleteRow = (id, data) => {
    const filteredElements = data.filter(function (item, index) {
      return item.id != id;
    });
    return filteredElements;
  };

  const onDelete = () => {
    const selectedRows = apiRef2.current.getSelectedRows();
    const iterator = selectedRows.values();
    var rows2_ = rows2;
    for (var idx = 0; idx < selectedRows.size; idx++) {
      const id = iterator.next().value.id;
      rows2_ = handleDeleteRow(id, rows2_);
    }
    setRows2(rows2_);
  };
  return (
    <Stack
      direction="row"
      spacing={5}
      sx={{
        height: '100%',
        width: '90%',
        alignItems: 'center',
        justifyItems: 'center',
        borderRadius: '10px',
        border: 15,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
      }}
    >
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
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
          Send
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
          Delete
        </Button>
      </Stack>
      <Stack
        spacing={5}
        alignItems="center"
        sx={{ width: '45%', maxHeight: '100%' }}
      >
        <Stack direction="row" spacing={5} alignItems="center">
          <Typography variant="h4" color="#9C6735">
            Grocery List
          </Typography>
          <ShoppingBasketIcon fontSize="large" sx={{ color: '#9C6735' }} />
        </Stack>
        {rows2.length > 0 ? (
          <DataGrid
            apiRef={apiRef2}
            rows={rows2}
            columns={columns}
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
        >
          Analyze Menu
        </Button>
      </Stack>
    </Stack>
  );
};

export default DataList;
