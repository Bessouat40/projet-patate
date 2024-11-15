import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';
import { useMemo } from 'react';

const useColumns = (addData) => {
  return useMemo(
    () => [
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
    ],
    [addData]
  );
};

export default useColumns;
