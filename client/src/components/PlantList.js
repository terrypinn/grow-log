import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as datefns from 'date-fns'

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

export default function PlantList() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  // fetch plants from the database upon page loads
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/plants`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plants = await response.json();
      setPlants(plants);
    }

    fetchData();
  }, []);

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
            <TableCell align="right">Grow Start</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {plants.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="center">{row.logs.length}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{datefns.format(new Date(row.germinated_on), 'dd LLL yyyy')}</TableCell>
              <TableCell align="right">
                <Link
                  component="button"
                  underline="none"
                  onClick={() => {
                    navigate('/plant/edit', {
                      state: {
                        id: row._id
                      }
                    })
                  }}
                >
                  Edit Plant
                </Link>
                &nbsp;|&nbsp;
                <Link
                  component="button"
                  underline="none"
                  onClick={() => {
                    navigate('/logs', {
                      state: {
                        id: row._id,
                        name: row.name
                      }
                    })
                  }}
                >
                  View Logs
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
