import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';

const columns = (selected, setSelected) => {
  const addData = (data) => {
    let _selected = [...selected];
    console.log(_selected);
    console.log(_selected[0]);
    let conflict = false;
    _selected.forEach((food, index) => {
      if (food['ALIMENT'] === data['ALIMENT']) {
        console.log(data);
        _selected[index] = data;
        conflict = true;
      }
    });
    if (!conflict) {
      _selected = [..._selected, data];
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
          <span className="csutable-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'QUANTITY',
      headerName: 'QUANTITE (g)',
      width: 150,
      editable: true,
    },
    {
      field: 'AJOUTER',
      headerName: 'AJOUTER',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <IconButton title={params.value} onClick={() => addData(params.row)}>
          <SendIcon />
        </IconButton>
      ),
    },
  ];
};

export default columns;
