import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import PlantForm from './PlantForm';

export default function PlantEdit() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <PlantForm action={FORM_ACTION.edit} plant={plant.current} />
    </Box>
  );
}
