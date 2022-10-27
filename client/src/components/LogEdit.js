import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';

export default function LogEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: '',
    note: '',
    images: ''
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/log/${location.state.id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`Log with id ${location.state.id} not found`);
        navigate('/plants');
        return;
      }

      data.images = data.images.join('\n');
      setForm(data);
    }

    fetchData();
  }, [location.state.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const data = { ...form };
    data.images = data.images.split(/\r?\n/).filter(x => x !== '');

    await fetch(`${process.env.REACT_APP_API_URL}/log/${location.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    navToLogs();
  }

  async function deleteLog() {
    if (!window.confirm("Are you sure you want to delete this log?")) return;

    await fetch(`${process.env.REACT_APP_API_URL}/log/${location.state.id}`, {
      method: 'DELETE'
    });

    navToLogs();
  }

  function navToLogs() {
    navigate('/logs', {
      state: {
        id: location.state.plant_id
      }
    });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <h4>Edit Log</h4>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="log-type-select-label">Type</InputLabel>
            <Select
              labelId="log-type-select-label"
              id="log-type-select"
              value={form.type}
              label="Type"
              onChange={(e) => updateForm({ type: e.target.value })}
            >
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Bad Insects">Bad Insects</MenuItem>
              <MenuItem value="Good Insects">Good Insects</MenuItem>
              <MenuItem value="Issues">Issues</MenuItem>
              <MenuItem value="Nutrients">Nutrients</MenuItem>
              <MenuItem value="Observation">Observation</MenuItem>
              <MenuItem value="Potting Up">Potting Up</MenuItem>
              <MenuItem value="Watering">Watering</MenuItem>
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
            onChange={(e) => updateForm({ note: e.target.value })}
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
            onChange={(e) => updateForm({ images: e.target.value })}
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
        <Grid item xs={1}>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={deleteLog}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth
            variant="outlined"
            onClick={navToLogs}>Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
