import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const FoodListButton = ({ setIntakes, apiRef, apiRef2, rows2, setRows2 }) => {
  const onTransfer = () => {
    setIntakes({});
    const selectedRows = apiRef.current.getSelectedRows();
    const iterator = selectedRows.values();
    const values = rows2.map((value) => {
      return value['ALIMENT'];
    });
    let rows2_ = rows2;
    for (var idx = 0; idx < selectedRows.size; idx++) {
      const value = iterator.next().value;
      apiRef.current.selectRow(value['id'], null, true);
      if (values.includes(value['ALIMENT'])) {
        const rows_clean = handleDeleteRow(value['ALIMENT'], rows2_);
        rows2_ = [...rows_clean, value];
      } else {
        rows2_ = [...rows2_, value];
      }
    }
    setRows2(rows2_);
  };

  const onDelete = () => {
    try {
      setIntakes({});
      const selectedRows = apiRef2.current.getSelectedRows();
      const iterator = selectedRows.values();
      var rows2_ = rows2;
      for (var idx = 0; idx < selectedRows.size; idx++) {
        const aliment = iterator.next().value.ALIMENT;
        rows2_ = handleDeleteRow(aliment, rows2_);
      }
      setRows2(rows2_);
    } catch {
      alert('Your menu list is empty');
    }
  };

  const handleDeleteRow = (aliment, data) => {
    const filteredElements = data.filter((item, index) => {
      return item.ALIMENT !== aliment;
    });
    return filteredElements;
  };
  return (
    <Stack spacing={5} justifyContent="center">
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        sx={{
          height: '10%',
          justifyContent: 'center',
          backgroundColor: '#423325',
          color: 'white',
          '&:hover': {
            backgroundColor: '#9C6735',
          },
        }}
        onClick={onTransfer}
      >
        Ajouter au menu
      </Button>
      <Button
        variant="contained"
        endIcon={<DeleteIcon />}
        sx={{
          height: '10%',
          justifyContent: 'center',
          backgroundColor: '#423325',
          color: 'white',
          '&:hover': {
            backgroundColor: '#9C6735',
          },
        }}
        onClick={onDelete}
      >
        Supprimer du menu
      </Button>
    </Stack>
  );
};

export default FoodListButton;
