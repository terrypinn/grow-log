import { FORM_ACTION } from './constants';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import PlantList from './components/PlantList';
import PlantAddEdit from './components/PlantAddEdit';
import LogList from './components/LogList';
import LogAddEdit from './components/LogAddEdit';

function App() {
  return (
    <div style={{ margin: 40 }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/plants" />} />
          <Route exact path="/plants" element={<PlantList />} />
          <Route exact path="/plant/add" element={<PlantAddEdit action={FORM_ACTION.add} />} />
          <Route exact path="/plant/edit" element={<PlantAddEdit action={FORM_ACTION.edit} />} />
          <Route exact path="/logs" element={<LogList />} />
          <Route exact path="/log/add" element={<LogAddEdit action={FORM_ACTION.add} />} />
          <Route exact path="/log/edit" element={<LogAddEdit action={FORM_ACTION.edit} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
