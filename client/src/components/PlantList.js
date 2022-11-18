import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as datefns from 'date-fns';

export default function PlantList() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/plants`)
      .then(resppnse => resppnse.json())
      .then(plants => setPlants(plants));
  }, []);

  const getGrowPeriod = (plant) => {
    const format = 'dd LLL yyyy';
    if (!plant.started_on) return;
    const done = () => {
      const displayStartDate = datefns.format(plant.started_on, format);
      const displayEndDate = datefns.format(plant.ended_on, format);
      const diffDays = datefns.differenceInDays(plant.ended_on, plant.started_on);
      return `${displayStartDate} - ${displayEndDate} | ${diffDays} days`;
    };
    const ongoing = () => {
      const displayDate = datefns.format(plant.started_on, format);
      const diffDays = datefns.differenceInDays(new Date(), plant.started_on);
      return `${displayDate} | ${diffDays} days`;
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}><h3>My&nbsp;Plants</h3></TableCell>
            <TableCell align="right">
              <Button
                onClick={() => navigate('/plant/add')}
                startIcon={<AddCircleIcon />}
                variant="contained">
                Add
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Logs</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Grow Period</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {plants.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="center">{row.logs.length}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{getGrowPeriod(row)}</TableCell>
              <TableCell align="right">
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navToPlantEdit(row)}
                >
                  Edit Plant
                </Link>
                &nbsp;|&nbsp;
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navToLogs(row)}
                >
                  View Logs
                </Link>
                &nbsp;|&nbsp;
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navToLogAddEdd(row)}
                >
                  Add Log
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
