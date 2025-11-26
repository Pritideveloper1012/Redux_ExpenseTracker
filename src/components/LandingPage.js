import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetTransactions
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalBudget = Number(budget);
    const totalCategories =
      Number(food || 0) + Number(travel || 0) + Number(entertainment || 0);

    const other = totalBudget - totalCategories;

    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(totalBudget));
    dispatch(
      updateCategoricalBudget({
        food: Number(food),
        travel: Number(travel),
        entertainment: Number(entertainment),
        other,
      })
    );

    navigate("/tracker");
  };

  const handleClear = () => {
    dispatch(resetTransactions());
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");
  };

  return (
    <div>
      <form name="landing-page-form" onSubmit={handleSubmit}>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <input id="food" type="number" value={food} onChange={(e) => setFood(e.target.value)} />
        <input id="travel" type="number" value={travel} onChange={(e) => setTravel(e.target.value)} />
        <input id="entertainment" type="number" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} />

        <button id="new-update" type="submit">New/Update Tracker</button>
        <button id="clear" type="button" onClick={handleClear}>Start new tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
