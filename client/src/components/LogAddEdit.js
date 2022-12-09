import { useRef } from 'react';
import Box from '@mui/material/Box';
import LogForm, { ACTIONS } from './LogForm';

export default function LogAddEdit(props) {
  const { action } = props;
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));
  const log = useRef(
    action === ACTIONS.edit
      ? JSON.parse(localStorage.getItem('log'))
      : null
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LogForm action={action} plant={plant.current} log={log.current} />
    </Box>
  );
}
