import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const FoodListButton = ({
  setProteines,
  setLysine,
  setCalories,
  apiRef,
  apiRef2,
  rows2,
  setRows2,
}) => {
  const onTransfer = () => {
    setProteines();
    setLysine();
    setCalories();
    const selectedRows = apiRef.current.getSelectedRows();
    const iterator = selectedRows.values();
    const values = rows2.map((value) => {
      return value['ALIMENT'];
    });
    for (var idx = 0; idx < selectedRows.size; idx++) {
      const value = iterator.next().value;
      apiRef.current.selectRow(value['id'], null, true);
      if (values.includes(value['ALIMENT'])) {
        const rows2_ = handleDeleteRow(value['id'], rows2);
        setRows2(rows2_);
      }
      if (!rows2.includes(value)) setRows2((prevRows) => [...prevRows, value]);
    }
  };

  const onDelete = () => {
    try {
      setProteines();
      setLysine();
      setCalories();
      const selectedRows = apiRef2.current.getSelectedRows();
      const iterator = selectedRows.values();
      var rows2_ = rows2;
      for (var idx = 0; idx < selectedRows.size; idx++) {
        const id = iterator.next().value.id;
        rows2_ = handleDeleteRow(id, rows2_);
      }
      setRows2(rows2_);
    } catch {
      alert('Your menu list is empty');
    }
  };

  const handleDeleteRow = (id, data) => {
    const filteredElements = data.filter(function (item, index) {
      return item.id !== id;
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
        Add to Menu
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
        Remove
      </Button>
    </Stack>
  );
};

export default FoodListButton;
