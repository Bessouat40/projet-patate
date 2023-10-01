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

export default columns;
