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

// Cypress store setup
if (window.Cypress && !window.store) {
  window.store = store;
}

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !totalBudget || !food || !travel || !entertainment) {
      alert("All fields are required");
      return;
    }

    const total = Number(totalBudget);
    const foodBudget = Number(food);
    const travelBudget = Number(travel);
    const entertainmentBudget = Number(entertainment);
    const others = total - (foodBudget + travelBudget + entertainmentBudget);

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

    navigate("/transactions"); // ✅ Correct path
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
          id="total-budget"
          placeholder="Total Budget"
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
        />

        <input
          id="food-budget"
          placeholder="Food"
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />

        <input
          id="travel-budget"
          placeholder="Travel"
          type="number"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
        />

        <input
          id="entertainment-budget"
          placeholder="Entertainment"
          type="number"
          value={entertainment}
          onChange={(e) => setEntertainment(e.target.value)}
        />

        <button id="new-update" type="submit">
          New/Update tracker
        </button>
      </form>

      <button id="clear" onClick={() => window.location.reload()}>
        Start new tracker
      </button>
    </div>
  );
};

export default LandingPage;
