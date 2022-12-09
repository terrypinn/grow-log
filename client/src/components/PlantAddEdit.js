import { useRef } from 'react';
import Box from '@mui/material/Box';
import PlantForm, { ACTIONS } from './PlantForm';

export default function PlantAddEdit(props) {
  const { action } = props;
  const plant = useRef(
    action === ACTIONS.edit
      ? JSON.parse(localStorage.getItem('plant'))
      : null);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <PlantForm action={action} plant={plant.current} />
    </Box>
  );
}
