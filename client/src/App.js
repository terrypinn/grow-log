import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import PlantList from './components/PlantList';
import PlantAdd from './components/PlantAdd';
import PlantEdit from './components/PlantEdit';
import LogList from './components/LogList';
import LogAdd from './components/LogAdd';
import LogEdit from './components/LogEdit';

function App() {
  return (
    <div style={{ margin: 20 }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/plants" />} />
          <Route exact path="/plants" element={<PlantList />} />
          <Route exact path="/plant/add" element={<PlantAdd />} />
          <Route exact path="/plant/edit" element={<PlantEdit />} />
          <Route exact path="/logs" element={<LogList />} />
          <Route exact path="/log/add" element={<LogAdd />} />
          <Route exact path="/log/edit" element={<LogEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
