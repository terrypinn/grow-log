import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import LogForm from './LogForm';

export default function LogEdit() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));
  const log = useRef(JSON.parse(localStorage.getItem('log')));

  return (
    <LogForm action={FORM_ACTION.edit} plant={plant.current} log={log.current} />
  );
}
