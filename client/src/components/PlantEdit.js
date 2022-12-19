import { FORM_ACTION } from '../constants';
import { useRef } from 'react';
import PlantForm from './PlantForm';

export default function PlantEdit() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));

  return (
    <PlantForm action={FORM_ACTION.edit} plant={plant.current} />
  );
}
