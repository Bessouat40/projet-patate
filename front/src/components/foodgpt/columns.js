// foodgpt/columns.js
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo } from 'react';

const useColumnsFoodGpt = (addData, deleteData) => {
  return useMemo(
    () => [
      {
        field: 'ALIMENT',
        headerName: 'Ingrédient',
        width: 300,
        editable: false,
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <span className="csutable-cell-truncate">{params.value}</span>
          </Tooltip>
        ),
      },
      {
        field: 'QUANTITY',
        headerName: 'Quantité (g)',
        width: 150,
        type: 'number',
        editable: true,
      },
      {
        field: 'AJOUTER',
        headerName: 'Ajouter',
        width: 80,
        editable: false,
        renderCell: (params) => (
          <IconButton title="Ajouter" onClick={() => addData(params)}>
            <SendIcon />
          </IconButton>
        ),
      },
      {
        field: 'SUPPRIMER',
        headerName: 'Supprimer',
        width: 100,
        editable: false,
        renderCell: (params) => (
          <IconButton title="Supprimer" onClick={() => deleteData(params.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    [addData, deleteData]
  );
};

export default useColumnsFoodGpt;
