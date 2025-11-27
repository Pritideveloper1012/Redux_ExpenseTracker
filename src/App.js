import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TransactionsPage from "./components/TransactionsPage";

const App = () => {
  return (
    <Routes>
      {/* Default landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Transactions Page */}
      <Route path="/tracker" element={<TransactionsPage />} />

      {/* Redirect any unknown route to landing page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
