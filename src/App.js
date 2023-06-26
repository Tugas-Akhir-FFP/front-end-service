import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import UserGuide from "./Pages/UserGuide";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/userguide" element={<UserGuide />} />
    </Routes>
  );
}

export default App;
