import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LandingPageForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserName(name));     //  <-- REQUIRED BY CYPRESS
    dispatch(updateMonthlyBudget(Number(budget)));

    dispatch(
      updateCategoricalBudget({
        food: 0,
        travel: 0,
        entertainment: 0,
        others: Number(budget),
      })
    );

    navigate("/transactions");  //  <-- Cypress expects navigation
  };

  return (
    <form id="landing-form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Budget</label>
      <input
        id="budget"
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <button id="start" type="submit">Start Tracking</button>
    </form>
  );
};

export default LandingPageForm;
