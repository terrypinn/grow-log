import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PlantList from './components/PlantList';
import PlantAdd from './components/PlantAdd';
import PlantEdit from './components/PlantEdit';
import EntryList from './components/EntryList';
import EntryAdd from './components/EntryAdd';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ margin: 20 }}>
          <Routes>
            <Route exact path="/" element={<PlantList />} />
            <Route exact path="/plant/add" element={<PlantAdd />} />
            <Route exact path="/plant/edit/:id" element={<PlantEdit />} />
            <Route exact path="/plant/:id/entries" element={<EntryList />} />
            <Route exact path="/plant/:id/entry/add" element={<EntryAdd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
