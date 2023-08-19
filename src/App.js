import { Route, Routes } from "react-router-dom";
import "./App.css";
import Schedular from "./component/Schedular";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Schedular />} />
      </Routes>
    </div>
  );
}

export default App;
