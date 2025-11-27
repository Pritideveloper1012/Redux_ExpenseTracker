import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import TransactionsPage from "./components/TransactionsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Cypress expects /transactions */}
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
