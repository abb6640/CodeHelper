import { Routes, Route, Link } from "react-router-dom";
import {HomePage} from "./pages/landing";
import {OutfitPickerPage} from "./pages/outfit-picker";
import { LandingPage } from "./pages/landing";

export default  function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/outfit-finder" element={<OutfitPickerPage />} />
        </Routes>
        

    </>
  );
}
