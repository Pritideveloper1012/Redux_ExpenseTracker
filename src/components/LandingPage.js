import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
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

    if (!name || !budget) {
      alert("All fields are required");
      return;
    }

    const totalBudget = Number(budget);
    const totalCategories =
      Number(food || 0) + Number(travel || 0) + Number(entertainment || 0);

    if (totalCategories > totalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    const other = totalBudget - totalCategories;

    // Dispatch data
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

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <form name="landing-page-form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          id="food"
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <input
          id="travel"
          type="number"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
        />
        <input
          id="entertainment"
          type="number"
          value={entertainment}
          onChange={(e) => setEntertainment(e.target.value)}
        />
        <button type="submit">Start Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
