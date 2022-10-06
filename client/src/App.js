import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import Plants from "./components/Plants";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ margin: 20 }}>
          <Routes>
            <Route exact path="/" element={<Plants />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
