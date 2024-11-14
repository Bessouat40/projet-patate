import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';

const columns = (selected, setSelected) => {
  const addData = (params) => {
    const cellMode = params.api.getCellMode(params.id, 'QUANTITY');

    if (cellMode === 'edit') {
      params.api.commitCellChange({ id: params.id, field: 'QUANTITY' });
      params.api.setCellMode(params.id, 'QUANTITY', 'view');
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
  };

  return [
    {
      field: 'ALIMENT',
      headerName: 'ALIMENT',
      width: 650,
      editable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="csutable-cell-truncate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'QUANTITY',
      headerName: 'QUANTITÉ (g)',
      width: 150,
      editable: true,
    },
    {
      field: 'AJOUTER',
      headerName: 'AJOUTER',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <IconButton title="Ajouter" onClick={() => addData(params)}>
          <SendIcon />
        </IconButton>
      ),
    },
  ];
};

export default columns;
