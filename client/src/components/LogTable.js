import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import * as datefns from 'date-fns';

LogTable.defaultProps = {
  plant: {},
  logs: []
};

export default function LogTable(props) {
  const { plant, logs } = props;
  const navigate = useNavigate();

  const navToLogEdit = (log) => {
    localStorage.setItem('log', JSON.stringify(log));
    navigate('/log/edit');
  };

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">
            Logs ({plant.name})
          </Typography>
        </Grid>
        <Grid item xs={6}>
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

      <Box mt={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Images</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={log._id}>
                  <TableCell component="th" scope="row">{logs.length - index}</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>{datefns.format(log.created_on, 'iii dd LLL yyyy HH:mm')}</TableCell>
                  <TableCell>{log.day}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.stage}</TableCell>
                  <TableCell sx={{ minWidth: 350 }}><div style={{ whiteSpace: 'pre-line' }}>{log.note}</div></TableCell>
                  <TableCell>
                    {log.images.map((url, index) => (
                      <div key={index}><a href={url} target="_blank" rel="noreferrer">{url}</a></div>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup size="small" variant="text" aria-label="actions button group">
                      <Button onClick={() => navToLogEdit(log)}>Edit</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
