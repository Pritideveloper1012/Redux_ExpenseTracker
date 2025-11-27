import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TransactionsPage from "./components/TransactionsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/tracker" element={<TransactionsPage />} />
    </Routes>
  );
};

export default App;
