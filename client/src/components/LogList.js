import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import EnhancedTable from './EnhancedTable';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as datefns from 'date-fns';

const headcells = [
  { id: 'id', disablePadding: false, label: '#' },
  { id: 'created_on', disablePadding: false, label: 'Created On' },
  { id: 'day', disablePadding: false, label: 'Day' },
  { id: 'type', disablePadding: false, label: 'Type' },
  { id: 'stage', disablePadding: false, label: 'Stage' },
  { id: 'note', disablePadding: false, label: 'Note' },
  { id: 'images', disablePadding: false, label: 'Images' }
];

// the api sortes the logs by created_on
// converting the logs into rows for the table
function createRows(logs) {
  const rows = logs.map((log, index) => createRow(
    logs.length - index,
    datefns.format(log.created_on, 'iii dd LLL yyyy HH:mm'),
    log.day,
    log.type,
    log.stage,
    log.note,
    log.images
  ));
  return rows;
};

function createRow(id, created_on, day, type, stage, note, images) {
  return {
    id,
    created_on,
    day,
    type,
    stage,
    note,
    images
  };
};

export default function LogList() {
  const navigate = useNavigate();
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}/logs`)
      .then(response => response.json())
      .then(logs => setRows(createRows(logs)));
  }, []);

  const navToLogEdit = (log) => {
    localStorage.setItem('log', JSON.stringify(log));
    navigate('/log/edit');
  };

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              onClick={() => navigate('/log/add')}
              startIcon={<AddCircleIcon />}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>

      <EnhancedTable
        tableTitle={`Logs (${plant.current.name})`}
        tableOrder={'desc'}
        tableOrderBy={'id'}
        tableHeadCells={headcells}
        tableRows={rows} />
    </Box>

  );
}
