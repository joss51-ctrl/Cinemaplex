import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import DetailPage from "../pages/DetailPage";
import SeriesPage from "../pages/SeriesPage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/:category/search/:keyword"
          element={<MoviesPage />}
        />

        <Route
          path="/:category/search/:keyword"
          element={<SeriesPage />}
        />

        <Route path="/:category" element={<SeriesPage />} />
        <Route path="/:category" element={<MoviesPage />} />
        <Route path="/:category/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
