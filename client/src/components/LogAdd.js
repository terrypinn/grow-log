import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import LogForm from './LogForm';

export default function LogAdd() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LogForm action={FORM_ACTION.add} plant={plant.current} />
    </Box>
  );
}
