import { LOG_TYPE } from '../constants';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';

export default function LogAddEdit({ mode }) {
  const navigate = useNavigate();
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));
  const log = useRef(mode === 'edit' ? JSON.parse(localStorage.getItem('log')) : null);

  const [form, setForm] = useState({
    created_on: new Date(),
    type: '',
    note: '',
    images: ''
  });

  useEffect(() => {
    if (mode === 'edit') {
      const form = { ...log.current }
      form.images = form.images.join('\n');
      setForm(form); 
    }
  }, [mode]);

  const updateForm = value => setForm(prev => ({ ...prev, ...value }));

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      ...form,
      created_on: +form.created_on,
      images: form.images.split(/\r?\n/).filter(x => x !== ''),
      plant_id: plant.current._id
    };
    mode === 'add'
      ? createLog(body)
      : updateLog(body);
  };

  const createLog = (body) =>
    fetch(`${process.env.REACT_APP_API_URL}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => navigate(-1));

  const updateLog = (body) =>
    fetch(`${process.env.REACT_APP_API_URL}/log/${log.current._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => navigate(-1));

  const deleteLog = () => {
    if (!window.confirm('Are you sure you want to delete this log?')) return;
    fetch(`${process.env.REACT_APP_API_URL}/log/${log.current._id}`, { method: 'DELETE' }).then(() => navigate(-1));
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <h4>{mode === 'add' ? 'Add' : 'Edit'} Log ({plant.current.name})</h4>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Created On"
              value={form.created_on}
              inputFormat="dd/MM/yyyy HH:mm"
              onChange={value => updateForm({ created_on: value })}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="log-type-select-label">Type</InputLabel>
            <Select
              labelId="log-type-select-label"
              id="log-type-select"
              value={form.type}
              label="Type"
              onChange={e => updateForm({ type: e.target.value })}
            >
              <MenuItem value={LOG_TYPE.Action}>Action</MenuItem>
              <MenuItem value={LOG_TYPE.BadInsects}>Bad Insects</MenuItem>
              <MenuItem value={LOG_TYPE.GoodInsects}>Good Insects</MenuItem>
              <MenuItem value={LOG_TYPE.Issues}>Issues</MenuItem>
              <MenuItem value={LOG_TYPE.Nutrients}>Nutrients</MenuItem>
              <MenuItem value={LOG_TYPE.Observation}>Observation</MenuItem>
              <MenuItem value={LOG_TYPE.PottingUp}>Potting Up</MenuItem>
              <MenuItem value={LOG_TYPE.Watering}>Watering</MenuItem>
            </Select>
          </FormControl>
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
        <Grid item xs={4}>
          <TextField
            id="images"
            label="Images"
            fullWidth
            multiline
            rows={4}
            value={form.images}
            onChange={e => updateForm({ images: e.target.value })}
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
              onClick={deleteLog}
            >
              Delete
            </Button>
          </Grid>}
        <Grid item xs={1}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(-1)}>Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
