import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/berita-kini" element={<Home />} />
        <Route path="/:kategori" element={<CategoryPage />} />
        <Route path="/detail/:portal/:kategori/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
