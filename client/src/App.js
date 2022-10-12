import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PlantList from './components/PlantList';
import PlantAdd from './components/PlantAdd';
import PlantView from './components/PlantView';
import EntryAdd from './components/EntryAdd';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ margin: 20 }}>
          <Routes>
            <Route exact path="/" element={<PlantList />} />
            <Route exact path="/plant/add" element={<PlantAdd />} />
            <Route exact path="/plant/:id" element={<PlantView />} />
            <Route exact path="/plant/:id/entry/add" element={<EntryAdd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
