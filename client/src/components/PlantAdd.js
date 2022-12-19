import { FORM_ACTION } from '../constants';
import PlantForm from './PlantForm';

export default function PlantAdd() {
  return (
    <PlantForm action={FORM_ACTION.add} />
  );
}
