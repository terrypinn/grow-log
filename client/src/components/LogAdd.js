import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import LogForm from './LogForm';

export default function LogAdd() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));

  return (
    <LogForm action={FORM_ACTION.add} plant={plant.current} />
  );
}
