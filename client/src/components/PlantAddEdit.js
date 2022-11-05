import { PLANT_LOCATION, PLANT_METHOD, PLANT_PROPAGATION, PLANT_TYPE } from '../constants';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SaveIcon from '@mui/icons-material/Save';

export default function PlantAddEdit({ mode }) {
  const navigate = useNavigate();
  const plant = useRef(mode === 'edit' ? JSON.parse(localStorage.getItem('plant')) : null);

  const [form, setForm] = useState({
    name: '',
    source: '',
    type: '',
    propagation: '',
    location: '',
    method: '',
    planted_on: null,
    germinated_on: null,
    note: '',
  });

  useEffect(() => {
    if (mode === 'edit') {
      const form = { ...plant.current };
      form.germinated_on = form.germinated_on ?? null;
      form.planted_on = form.planted_on ?? null;
      setForm(plant.current);
    }
  }, [mode]);

  const updateForm = value => setForm(prev => ({ ...prev, ...value }));

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      ...form,
      germinated_on: form.germinated_on === null ? '' : +form.germinated_on,
      planted_on: form.planted_on === null ? '' : +form.planted_on
    };
    mode === 'add'
      ? createPlant(body)
      : updatePlant(body);
  };

  const createPlant = (body) =>
    fetch(`${process.env.REACT_APP_API_URL}/plant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => navigate(-1));

  const updatePlant = (body) =>
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => navigate(-1));

  const deletePlant = () => {
    if (!window.confirm('Are you sure you want to delete this plant?')) return;
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}`, { method: 'DELETE' }).then(() => navigate(-1));
  };

  const onChangeType = (value) =>
    updateForm(value === PLANT_TYPE.Regular
      ? { type: value }
      : { type: value, propagation: PLANT_PROPAGATION.Seed });

  const onChangePropagation = (value) =>
    updateForm(value === PLANT_PROPAGATION.Seed
      ? { propagation: value }
      : { propagation: value, germinated_on: null });

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <h4>{mode === 'add' ? 'Add' : 'Edit'} Plant</h4>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            value={form.name}
            onChange={e => updateForm({ name: e.target.value })}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="source"
            label="Source"
            value={form.source}
            onChange={e => updateForm({ source: e.target.value })}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={1}>
          <FormControl>
            <FormLabel id="plant-type-radio-buttons-group">Type</FormLabel>
            <RadioGroup
              aria-labelledby="plant-type-radio-buttons-group"
              name="type-options"
              value={form.type}
              onChange={e => onChangeType(e.target.value)}
            >
              <FormControlLabel value="Autoflower" control={<Radio />} label="Auto" />
              <FormControlLabel value="Regular" control={<Radio />} label="Reg" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <FormLabel id="plant-propagation-radio-buttons-group">Propagation</FormLabel>
            <RadioGroup
              aria-labelledby="plant-propagation-radio-buttons-group"
              name="propagation-options"
              value={form.propagation}
              onChange={e => onChangePropagation(e.target.value)}
            >
              <FormControlLabel
                value={PLANT_TYPE.Seed}
                control={<Radio />}
                label="Seed"
              />
              <FormControlLabel
                value={PLANT_TYPE.Clone}
                control={<Radio />}
                label="Clone"
                disabled={!form.type || form.type === 'Autoflower'}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <FormLabel id="plant-location-radio-buttons-group">Location</FormLabel>
            <RadioGroup
              aria-labelledby="plant-location-radio-buttons-group"
              name="location-options"
              value={form.location}
              onChange={e => updateForm({ location: e.target.value })}
            >
              <FormControlLabel value={PLANT_LOCATION.Indoor} control={<Radio />} label="Indoor" />
              <FormControlLabel value={PLANT_LOCATION.Outdoor} control={<Radio />} label="Outdoor" />
              <FormControlLabel value={PLANT_LOCATION.Greenhouse} control={<Radio />} label="GH" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1} ml={2}>
          <FormControl>
            <FormLabel id="plant-method-radio-buttons-group">Method</FormLabel>
            <RadioGroup
              aria-labelledby="plant-method-radio-buttons-group"
              name="method-options"
              value={form.method}
              onChange={e => updateForm({ method: e.target.value })}
            >
              <FormControlLabel value={PLANT_METHOD.Soil} control={<Radio />} label="Soil" />
              <FormControlLabel value={PLANT_METHOD.Hydroponics} control={<Radio />} label="Hydro" />
              <FormControlLabel value={PLANT_METHOD.Aquaponics} control={<Radio />} label="Aqua" />
              <FormControlLabel value={PLANT_METHOD.Aeroponics} control={<Radio />} label="Aero" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Planted On"
              value={form.planted_on}
              inputFormat="dd/MM/yyyy"
              onChange={value => updateForm({ planted_on: value })}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disabled={!form.propagation || form.propagation === 'Clone'}
              label="Germinated On"
              value={form.germinated_on}
              inputFormat="dd/MM/yyyy"
              onChange={value => updateForm({ germinated_on: value })}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={4}>
          <TextField
            id="note"
            label="Note"
            fullWidth
            multiline
            rows={8}
            value={form.note}
            onChange={e => updateForm({ note: e.target.value })}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={1}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}>
            Save
          </Button>
        </Grid>
        {mode === 'edit' &&
          <Grid item xs={1}>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={deletePlant}
            >
              Delete
            </Button>
          </Grid>}
        <Grid item xs={1}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
