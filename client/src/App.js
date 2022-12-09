import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import PlantList from './components/PlantList';
import PlantAddEdit from './components/PlantAddEdit';
import LogList from './components/LogList';
import LogAddEdit from './components/LogAddEdit';

import { ACTIONS as PLANT_FORM_ACTIONS } from './components/PlantForm';
import { ACTIONS as LOG_FORM_ACTIONS } from './components/LogForm';

function App() {
  return (
    <div style={{ margin: 40 }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/plants" />} />
          <Route exact path="/plants" element={<PlantList />} />
          <Route exact path="/plant/add" element={<PlantAddEdit action={PLANT_FORM_ACTIONS.add} />} />
          <Route exact path="/plant/edit" element={<PlantAddEdit action={PLANT_FORM_ACTIONS.edit} />} />
          <Route exact path="/logs" element={<LogList />} />
          <Route exact path="/log/add" element={<LogAddEdit action={LOG_FORM_ACTIONS.add} />} />
          <Route exact path="/log/edit" element={<LogAddEdit action={LOG_FORM_ACTIONS.edit} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
