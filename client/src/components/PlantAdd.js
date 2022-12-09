import { FORM_ACTION } from '../constants';
import Box from '@mui/material/Box';
import PlantForm from './PlantForm';

export default function PlantAdd() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <PlantForm action={FORM_ACTION.add} />
    </Box>
  );
}
