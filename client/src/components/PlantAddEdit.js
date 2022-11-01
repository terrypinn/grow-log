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
import * as datefns from 'date-fns'

export default function PlantAddEdit(props) {
  const navigate = useNavigate();
  const plant = useRef(props.mode === 'edit' ? JSON.parse(localStorage.getItem('plant')) : null);

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
    if (props.mode === 'edit') {
      const form = { ...plant.current };
      form.germinated_on = form.germinated_on ?? null;
      form.planted_on = form.planted_on ?? null;
      setForm(plant.current);
    }
  }, [props.mode]);

  const updateForm = value => setForm(prev => ({ ...prev, ...value }));

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      ...form,
      germinated_on: form.germinated_on ?? '',
      planted_on: form.planted_on ?? ''
    };
    props.mode === 'add' ? createPlant(body) : updatePlant(body);
  };

  const createPlant = (body) => {
    fetch(`${process.env.REACT_APP_API_URL}/plant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => navigate(-1));
  };

  const updatePlant = (body) => {
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => navigate(-1));
  };

  const deletePlant = () => {
    if (!window.confirm('Are you sure you want to delete this plant?')) return;
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}`, { method: 'DELETE' }).then(() => navigate(-1));
  };

  const formatDatePickerValue = (value) => {
    if (!value) return null;
    return datefns.format(value, 'yyyy-MM-dd');
  };

  const onChangeType = (value) => {
    updateForm(value === 'Regular' ? { type: value } : { type: value, propagation: 'Seed' });
  };

  const onPropagationChange = (value) => {
    updateForm(value === 'Seed' ? { propagation: value } : { propagation: value, germinated_on: null });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <h4>{props.mode === 'add' ? 'Add' : 'Edit'} Plant</h4>

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
              <FormControlLabel value="Autoflower" control={<Radio />} label="Autoflower" />
              <FormControlLabel value="Regular" control={<Radio />} label="Regular" />
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
              onChange={e => onPropagationChange(e.target.value)}
            >
              <FormControlLabel
                value="Seed"
                control={<Radio />}
                label="Seed"
              />
              <FormControlLabel
                value="Clone"
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
              <FormControlLabel value="Indoor" control={<Radio />} label="Indoor" />
              <FormControlLabel value="Outdoor" control={<Radio />} label="Outdoor" />
              <FormControlLabel value="Greenhouse" control={<Radio />} label="Greenhouse" />
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
              <FormControlLabel value="Soil" control={<Radio />} label="Soil" />
              <FormControlLabel value="Hydroponics" control={<Radio />} label="Hydroponics" />
              <FormControlLabel value="Aquaponics" control={<Radio />} label="Aquaponics" />
              <FormControlLabel value="Aeroponics" control={<Radio />} label="Aeroponics" />
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
              onChange={value => updateForm({ planted_on: formatDatePickerValue(value) })}
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
              onChange={value => updateForm({ germinated_on: formatDatePickerValue(value) })}
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
        {props.mode === 'edit' &&
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
