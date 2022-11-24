import { LOG_TYPE, LOG_TYPE_OPTIONS } from '../constants';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const onChangeType = (value) => {
    if (value === LOG_TYPE.Training || value === LOG_TYPE.Watering) {
      const dialog = () => window.confirm('This action will clear your note. Proceed?');
      if (!form.note.trim() || dialog()) updateForm({ type: value, note: LOG_TYPE_OPTIONS[value].join(' | ') });
      return;
    }
    updateForm({ type: value });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <Grid container alignItems="center">
        <Grid item xs={mode === 'add' ? 12 : 10}>
          <Typography variant="h6">
            {mode === 'add' ? 'Add' : 'Edit'} Log ({plant.current.name})
          </Typography>
        </Grid>
        {mode === 'edit' &&
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton aria-label="delete" size="large" onClick={deleteLog}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Grid>}
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Created On"
              value={form.created_on}
              inputFormat="dd/MM/yyyy HH:mm"
              onChange={value => updateForm({ created_on: value })}
              renderInput={params => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="log-type-select-label">Type</InputLabel>
            <Select
              labelId="log-type-select-label"
              id="log-type-select"
              value={form.type}
              label="Type"
              onChange={e => onChangeType(e.target.value)}
            >
              <MenuItem value={LOG_TYPE.Action}>Action</MenuItem>
              <MenuItem value={LOG_TYPE.BadInsects}>Bad Insects</MenuItem>
              <MenuItem value={LOG_TYPE.GoodInsects}>Good Insects</MenuItem>
              <MenuItem value={LOG_TYPE.Issues}>Issues</MenuItem>
              <MenuItem value={LOG_TYPE.Nutrients}>Nutrients</MenuItem>
              <MenuItem value={LOG_TYPE.Observation}>Observation</MenuItem>
              <MenuItem value={LOG_TYPE.PottingUp}>Potting Up</MenuItem>
              <MenuItem value={LOG_TYPE.Training}>Training</MenuItem>
              <MenuItem value={LOG_TYPE.Watering}>Watering</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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

      <Box mt={1} spacing={1}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ mr: 1 }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
