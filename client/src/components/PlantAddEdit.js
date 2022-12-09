import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import PlantForm from './PlantForm';

export default function PlantAddEdit(props) {
  const { action } = props;
  const plant = useRef(
    action === FORM_ACTION.edit
      ? JSON.parse(localStorage.getItem('plant'))
      : null
  );

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
