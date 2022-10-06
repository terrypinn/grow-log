import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PlantList from './components/PlantList';
import PlantAdd from './components/PlantAdd';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ margin: 20 }}>
          <Routes>
            <Route exact path="/" element={<PlantList />} />
            <Route exact path="/plant/add" element={<PlantAdd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
