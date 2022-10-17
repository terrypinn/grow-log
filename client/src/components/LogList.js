import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function LogList() {
  const params = useParams();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logs/${params.id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`Plant with id ${params.id} not found`);
        navigate('/');
        return;
      }

      setLogs(data);
    }

    fetchData();
  }, [params.id, navigate]);

  return (
    <Box margin={1}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Logs</h3>
              </TableCell>
              <TableCell />
              <TableCell align="right">
                <Button
                  onClick={() => navigate('/')}
                  startIcon={<ArrowCircleLeftIcon />}
                  variant="contained">
                  Back
                </Button>
                &nbsp;
                <Button
                  onClick={() => navigate(`/plant/${params.id}/log/add`)}
                  startIcon={<AddCircleIcon />}
                  variant="contained">
                  Add
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Images</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row.type}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.images.map((url, index) => (
                  <div key={index}>{<a href={url} target="_blank" rel="noreferrer">{url}</a>}</div>
                ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
