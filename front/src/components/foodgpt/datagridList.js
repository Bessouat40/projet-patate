import React, { useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useColumnsFoodGpt from './columns';

const DataGridListFoodGpt = ({
  filterRows,
  setFilterRows,
  selected,
  setSelected,
  apiRef,
}) => {
  const addData = useCallback(
    (params) => {
      const cellMode = apiRef.current.getCellMode(params.id, 'QUANTITY');

      if (cellMode === 'edit') {
        apiRef.current.commitCellChange({ id: params.id, field: 'QUANTITY' });
        apiRef.current.setCellMode(params.id, 'QUANTITY', 'view');
      }

      const updatedData = params.api.getRow(params.id);

      let _selected = [...selected];
      let conflict = false;

      _selected.forEach((food, index) => {
        if (food['ALIMENT'] === updatedData['ALIMENT']) {
          _selected[index] = updatedData;
          conflict = true;
        }
      });
      if (!conflict) {
        _selected = [..._selected, updatedData];
      }
      setSelected(_selected);
    },
    [selected, setSelected, apiRef]
  );

  const deleteData = useCallback(
    (id) => {
      const updatedRows = filterRows.filter((row) => row.id !== id);
      setFilterRows(updatedRows);
    },
    [filterRows, setFilterRows]
  );

  const columns = useColumnsFoodGpt(addData, deleteData);

  return (
    <Stack>
      {filterRows.length > 0 ? (
        <DataGrid
          apiRef={apiRef}
          rows={filterRows}
          columns={columns}
          sx={{ backgroundColor: 'white' }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableColumnMenu
          disableRowSelectionOnClick
          onCellClick={(params) => {
            if (params.field === 'QUANTITY') {
              apiRef.current.startCellEditMode({
                id: params.id,
                field: params.field,
              });
            }
          }}
        />
      ) : (
        <Typography>
          Aucun aliment ne correspond à votre recherche...
        </Typography>
      )}
    </Stack>
  );
};

export default DataGridListFoodGpt;
