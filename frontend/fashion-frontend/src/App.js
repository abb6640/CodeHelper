import { Routes, Route, Link } from "react-router-dom";
import {HomePage} from "./pages/landing";
import {OutfitPickerPage} from "./pages/outfit-picker";

export default  function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/outfit-finder" element={<OutfitPickerPage />} />
        </Routes>

    </>
  );
}
