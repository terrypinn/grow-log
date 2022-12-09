import { useRef } from 'react';
import PlantForm, { ACTIONS } from './PlantForm';

export default function PlantAddEdit(props) {
  const { action } = props;
  const plant = useRef(
    action === ACTIONS.edit
      ? JSON.parse(localStorage.getItem('plant'))
      : null);

  return (
    <PlantForm action={action} plant={plant.current} />
  );
}
