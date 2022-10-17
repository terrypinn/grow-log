import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as datefns from 'date-fns'

import Box from '@mui/material/Box';
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
    <Box margin={1}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><h3>My&nbsp;Plants</h3></TableCell>
              <TableCell />
              <TableCell />
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
              <TableCell align="center">Logs</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Created&nbsp;On</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="center" onClick={() => { navigate(`/plant/${row._id}/logs`) }}>
                  <Link component="button" underline="none">{row.logs.length}</Link>
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{datefns.formatDistance(row.createdOn, Date.now(), { addSuffix: true })}</TableCell>
                <TableCell align="right">
                  <Link
                    component="button"
                    underline="none"
                    onClick={() => { navigate(`/plant/edit/${row._id}`) }}
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
