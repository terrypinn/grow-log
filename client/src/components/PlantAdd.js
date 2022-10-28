import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as datefns from 'date-fns'

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

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function PlantAdd() {
  const [form, setForm] = useState({
    name: '',
    source: '',
    type: '',
    propagation: '',
    location: 'Indoor',
    method: 'Soil',
    planted_on: null,
    germinated_on: null,
    note: '',
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/plant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => navigate(-1));
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <h4>Create New Plant</h4>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="source"
            label="Source"
            value={form.source}
            onChange={(e) => updateForm({ source: e.target.value })}
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
              onChange={(e) => updateForm({ type: e.target.value })}
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
              onChange={(e) => updateForm({ propagation: e.target.value })}
            >
              <FormControlLabel value="Seed" control={<Radio />} label="Seed" />
              <FormControlLabel value="Clone" control={<Radio />} label="Clone" />
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
              onChange={(e) => updateForm({ location: e.target.value })}
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
              onChange={(e) => updateForm({ method: e.target.value })}
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
              onChange={(value) => updateForm({ planted_on: datefns.format(value, 'yyyy-MM-dd') })}
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
              onChange={(value) => updateForm({ germinated_on: datefns.format(value, 'yyyy-MM-dd') })}
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
            onChange={(e) => updateForm({ note: e.target.value })}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={1}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}>
            Save
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" onClick={() => navigate('/plants')}>Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
