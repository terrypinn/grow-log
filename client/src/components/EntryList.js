import { useNavigate } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function EntryList(props) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h4>Entries</h4>
            </TableCell>
            <TableCell />
            <TableCell align="right">
              <Button
                onClick={() => navigate(`/plant/${props.plant._id}/entry/add`)}
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
          {props.plant?.entries?.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">{row.type}</TableCell>
              <TableCell>{row.note}</TableCell>
              <TableCell>{row.images.map((url) => (<div>{<a href={url} target="_blank">{url}</a>}</div>))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
