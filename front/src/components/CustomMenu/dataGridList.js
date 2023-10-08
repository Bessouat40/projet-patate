import { Stack } from '@mui/material';
import columns from './columns';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DataGridList = ({ filterRows, apiRef }) => {
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
                pageSize: 9,
              },
            },
          }}
          pageSizeOptions={[9]}
          disableColumnMenu
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <Typography color="white">
          Aucun aliment ne correspond à votre recherche...
        </Typography>
      )}
    </Stack>
  );
};

export default DataGridList;
