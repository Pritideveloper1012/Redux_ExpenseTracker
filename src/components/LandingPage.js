// src/components/LandingPageForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LandingPageForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [foodBudget, setFoodBudget] = useState("");
  const [travelBudget, setTravelBudget] = useState("");
  const [entertainmentBudget, setEntertainmentBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !totalBudget || !foodBudget || !travelBudget || !entertainmentBudget) {
      alert("All fields are required");
      return;
    }

    const total = Number(totalBudget);
    const food = Number(foodBudget);
    const travel = Number(travelBudget);
    const entertainment = Number(entertainmentBudget);

    if (food + travel + entertainment > total) {
      alert("Category budgets exceed total budget");
      return;
    }

    // Redux dispatch
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(total));
    dispatch(updateCategoricalBudget({
      food,
      travel,
      entertainment
    }));

    // Navigate to Transactions Page
    navigate("/transactions");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Expense Tracker</h1>
      <form onSubmit={handleSubmit} id="landing-form">
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="total-budget"
          type="number"
          placeholder="Total Budget"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
        />
        <input
          id="food-budget"
          type="number"
          placeholder="Food Budget"
          value={foodBudget}
          onChange={(e) => setFoodBudget(e.target.value)}
        />
        <input
          id="travel-budget"
          type="number"
          placeholder="Travel Budget"
          value={travelBudget}
          onChange={(e) => setTravelBudget(e.target.value)}
        />
        <input
          id="entertainment-budget"
          type="number"
          placeholder="Entertainment Budget"
          value={entertainmentBudget}
          onChange={(e) => setEntertainmentBudget(e.target.value)}
        />
        <button type="submit" id="start-btn">Start Tracker</button>
      </form>
    </div>
  );
};

export default LandingPageForm;
