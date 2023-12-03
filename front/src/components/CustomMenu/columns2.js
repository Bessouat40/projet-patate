import Tooltip from '@mui/material/Tooltip';

const columns2 = [
  {
    field: 'ALIMENT',
    headerName: 'ALIMENT',
    width: 650,
    editable: false,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span className="csutable-cell-trucate">{params.value}</span>
      </Tooltip>
    ),
  },
  {
    field: 'QUANTITY',
    headerName: 'QUANTITE (g)',
    width: 150,
    editable: false,
  },
];

export default columns2;
