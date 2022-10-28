import { useEffect, useRef, useState } from 'react';
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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function LogList() {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));

  useEffect(() => {
    if (!plant.current) {
      navigate('/plants');
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}/logs`)
      .then(response => response.json())
      .then(logs => setLogs(logs));
  }, [navigate]);

  const navToLogEdit = (log) => {
    localStorage.setItem('log', JSON.stringify(log));
    navigate('/log/edit');
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}><h3>Logs ({plant.current?.name})</h3></TableCell>
            <TableCell colSpan={2} align="right">
              <Button
                onClick={() => navigate('/plants')}
                startIcon={<ArrowCircleLeftIcon />}
                variant="contained">
                Back
              </Button>
              &nbsp;
              <Button
                onClick={() => navigate('/log/add')}
                startIcon={<AddCircleIcon />}
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Images</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((row, index) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">{logs.length - index}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{datefns.format(row.created_on, 'iii dd LLL yyyy HH:mm')}</TableCell>
              <TableCell><div style={{ whiteSpace: 'pre-line' }}>{row.note}</div></TableCell>
              <TableCell>{row.images.map((url, index) => (
                <div key={index}>{<a href={url} target="_blank" rel="noreferrer">{url}</a>}</div>
              ))}
              </TableCell>
              <TableCell align="right">
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navToLogEdit(row)}
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
