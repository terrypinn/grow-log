import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';

export default function EntryAdd(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({
    type: '',
    note: '',
    images: ''
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const data = { ...form };
    data.images = data.images.split(/\r?\n/).filter(x => x !== '');

    await fetch(`http://localhost:5000/plant/${params.id}/entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    navigate(`/plant/${params.id}`);
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      margin={1}
    >
      <h4>Create a New Entry</h4>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="entry-tyoe-select-label">Type</InputLabel>
            <Select
              labelId="entry-tyoe-select-label"
              id="entry-tyoe-select"
              value={form.type}
              label="Type"
              onChange={(e) => updateForm({ type: e.target.value })}
            >
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Bad Insects">Bad Insects</MenuItem>
              <MenuItem value="Good Insects">Good Inseects</MenuItem>
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
            rows={4}
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
            variant="outlined"
            onClick={() => { navigate(`/plant/${params.id}`) }}>Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
