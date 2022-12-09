import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import LogForm from './LogForm';

export default function LogEdit() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));
  const log = useRef(JSON.parse(localStorage.getItem('log')));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LogForm action={FORM_ACTION.edit} plant={plant.current} log={log.current} />
    </Box>
  );
}
