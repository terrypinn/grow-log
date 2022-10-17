import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PlantList from './components/PlantList';
import PlantAdd from './components/PlantAdd';
import PlantEdit from './components/PlantEdit';
import LogList from './components/LogList';
import LogAdd from './components/LogAdd';
import LogEdit from './components/LogEdit';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ margin: 20 }}>
          <Routes>
            <Route exact path="/" element={<PlantList />} />
            <Route exact path="/plant/add" element={<PlantAdd />} />
            <Route exact path="/plant/edit/:id" element={<PlantEdit />} />
            <Route exact path="/plant/:id/logs" element={<LogList />} />
            <Route exact path="/plant/:id/log/add" element={<LogAdd />} />
            <Route exact path="/log/edit/:id" element={<LogEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
