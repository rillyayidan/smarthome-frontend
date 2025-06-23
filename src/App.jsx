import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PredictPage from "./pages/PredictPage";
import ExplorePage from "./pages/ExplorePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <div className="bg-white text-gray-800 min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;