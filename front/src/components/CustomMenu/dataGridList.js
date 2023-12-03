import { Stack } from '@mui/material';
import columns from './columns';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DataGridList = ({ filterRows, apiRef, selected, setSelected }) => {
  return (
    <Stack>
      {filterRows.length > 0 ? (
        <DataGrid
          apiRef={apiRef}
          rows={filterRows}
          columns={columns(selected, setSelected)}
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
        />
      ) : (
        <Typography>
          Aucun aliment ne correspond à votre recherche...
        </Typography>
      )}
    </Stack>
  );
};

export default DataGridList;
