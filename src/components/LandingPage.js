import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
} from "../redux/userSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import store from "../redux/store";

if (window.Cypress && !window.store) {
  window.store = store;
}

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

    if (!name || !budget || !food || !travel || !entertainment) {
      alert("All fields are required");
      return;
    }

    const total = Number(budget);
    const foodBudget = Number(food);
    const travelBudget = Number(travel);
    const entertainmentBudget = Number(entertainment);

    const sum = foodBudget + travelBudget + entertainmentBudget;
    const others = total - sum;

    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(total));
    dispatch(
      updateCategoricalBudget({
        food: foodBudget,
        travel: travelBudget,
        entertainment: entertainmentBudget,
        others,
      })
    );
    dispatch(resetAllExpense());

    navigate("/tracker");
  };

  return (
    <div className="landing-page">
      <h1>Expense Tracker</h1>

      <form id="landing-page-form" onSubmit={handleSubmit}>
        <input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          id="budget"
          placeholder="Total Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          id="food"
          placeholder="Food"
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />

        <input
          id="travel"
          placeholder="Travel"
          type="number"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
        />

        <input
          id="entertainment"
          placeholder="Entertainment"
          type="number"
          value={entertainment}
          onChange={(e) => setEntertainment(e.target.value)}
        />

        <button id="new-update" type="submit">
          New/Update tracker
        </button>
      </form>

      <button
  id="clear"
  onClick={() => {
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");
    dispatch(resetAllExpense());
    // if you also need to reset user info:
    dispatch(updateUserName(""));
    dispatch(updateMonthlyBudget(0));
    dispatch(updateCategoricalBudget({
      food: 0,
      travel: 0,
      entertainment: 0,
      others: 0,
    }));
  }}
>
  Start new tracker
</button>

    </div>
  );
};

export default LandingPage;
