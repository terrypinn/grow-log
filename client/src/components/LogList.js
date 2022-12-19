import { useEffect, useRef, useState } from 'react';
import LogTable from './LogTable';

export default function LogList() {
  const plant = useRef(JSON.parse(localStorage.getItem('plant')));
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/plant/${plant.current._id}/logs`)
      .then(response => response.json())
      .then(logs => setLogs(logs));
  }, []);

  return (
    <LogTable plant={plant.current} logs={logs} />
  );
}
