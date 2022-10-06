import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Plants from "./components/Plants";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
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
