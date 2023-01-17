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
import Typography from '@mui/material/Typography';
import * as datefns from 'date-fns';

PlantTable.defaultProps = {
  plants: []
};

export default function PlantTable(props) {
  const { plants } = props;
  const navigate = useNavigate();

  const getGrowPeriod = (plant) => {
    if (!plant.started_on) return;
    const format = 'dd LLL yyyy';
    const done = () => {
      const midnight = datefns.add(new Date(plant.ended_on).setHours(0, 0, 0, 0), { days: 1 });
      const days = datefns.differenceInDays(midnight, plant.started_on);
      const weeks = datefns.differenceInWeeks(midnight, plant.started_on);
      const start = datefns.format(plant.started_on, format);
      const end = datefns.format(plant.ended_on, format);
      return weeks == 0
        ? `${start} - ${end} | ${days} days`
        : `${start} - ${end} | ${weeks} wk ${days} d`;
    };
    const ongoing = () => {
      const midnight = datefns.add(new Date().setHours(0, 0, 0, 0), { days: 1 });
      const days = datefns.differenceInDays(midnight, plant.started_on);
      const weeks = datefns.differenceInWeeks(midnight, plant.started_on);
      const start = datefns.format(plant.started_on, format);
      return weeks == 0
        ? `${start} | ${days} days`
        : `${start} | ${weeks} wk ${days} d`;
    };
    return plant.ended_on ? done() : ongoing();
  };

  const navToPlantEdit = (plant) => {
    localStorage.setItem('plant', JSON.stringify(plant));
    navigate('/plant/edit');
  };

  const navToLogs = (plant) => {
    localStorage.setItem('plant', JSON.stringify(plant));
    navigate('/logs');
  };

  const navToLogAddEdd = (plant) => {
    localStorage.setItem('plant', JSON.stringify(plant));
    navigate('/log/add');
  };

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">
            My Plants
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => navigate('/plant/add')}
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
                <TableCell>Name</TableCell>
                <TableCell align="center">Logs</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Stage</TableCell>
                <TableCell align="right">Grow Period</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {plants.map((plant) => (
                <TableRow key={plant._id}>
                  <TableCell component="th" scope="row">{plant.name}</TableCell>
                  <TableCell align="center">{plant.logs.length}</TableCell>
                  <TableCell align="right">{plant.type}</TableCell>
                  <TableCell align="right">{plant.stage}</TableCell>
                  <TableCell align="right">{getGrowPeriod(plant)}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup size="small" variant="text" aria-label="actions button group">
                      <Button onClick={() => navToPlantEdit(plant)}>Edit Plant</Button>
                      <Button onClick={() => navToLogs(plant)}>View Logs</Button>
                      <Button onClick={() => navToLogAddEdd(plant)}>Add Log</Button>
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
