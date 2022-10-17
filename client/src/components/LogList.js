import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function LogList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logs/${location.state.id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`Plant with id ${location.state.id} not found`);
        navigate('/plants');
        return;
      }

      setLogs(data);
    }

    fetchData();
  }, [location.state.id, navigate]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><h3>Logs ({location.state.name})</h3></TableCell>
            <TableCell />
            <TableCell />
            <TableCell align="right">
              <Button
                onClick={() => navigate('/plants')}
                startIcon={<ArrowCircleLeftIcon />}
                variant="contained">
                Back
              </Button>
              &nbsp;
              <Button
                onClick={() => navigate('/log/add', {
                  state: {
                    id: location.state.id
                  }
                })}
                startIcon={<AddCircleIcon />}
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Images</TableCell>
            <TableCell />
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
              <TableCell align="right">
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navigate('/log/edit', {
                    state: {
                      id: row._id,
                      plant_id: row.plant_id
                    }
                  })}
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
