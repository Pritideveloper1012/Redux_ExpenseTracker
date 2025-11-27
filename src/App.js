import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ExpenseForm from "./components/ExpenseForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/transactions" element={<ExpenseForm />} />
    </Routes>
  );
};

export default App;
