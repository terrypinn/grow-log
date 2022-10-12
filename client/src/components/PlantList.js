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
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function PlantList() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  // fetch plants from the database upon page loads
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/plants/`);

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
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <h3>My&nbsp;Plants</h3>
            </TableCell>
            <TableCell />
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
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Created&nbsp;On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plants.map((row) => (
            <TableRow
              key={row._id}
              onClick={() => navigate(`/plant/${row._id}`)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{datefns.formatDistance(row.created_on, Date.now(), { addSuffix: true })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
