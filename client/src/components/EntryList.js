import { useLocation, useNavigate } from 'react-router';

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

export default function EntryList() {
  const location = useLocation();
  const navigate = useNavigate();
 
  const { plant } = location.state;

  return (
    <Box margin={1}>
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
                  onClick={() => navigate(`/plant/${plant._id}/entry/add`)}
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
            {plant.entries?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row.type}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.images.map((url) => (<div>{<a href={url} target="_blank" rel="noopener">{url}</a>}</div>))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
