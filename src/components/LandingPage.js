import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetAllBudget,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [foodBudget, setFoodBudget] = useState(0);
  const [travelBudget, setTravelBudget] = useState(0);
  const [entertainmentBudget, setEntertainmentBudget] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: All fields must be filled
    if (!name || !budget) {
      alert("All fields are required");
      return;
    }

    const totalCategory = foodBudget + travelBudget + entertainmentBudget;
    if (totalCategory > budget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    // If totalCategory < budget, assign remaining to "Other"
    const otherBudget = budget - totalCategory;

    // Dispatch user info
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(budget));
    dispatch(
      updateCategoricalBudget({
        food: foodBudget,
        travel: travelBudget,
        entertainment: entertainmentBudget,
        other: otherBudget,
      })
    );

    navigate("/tracker"); // ✅ Navigate after Redux update
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Expense Tracker</h1>
      <form name="landing-page-form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="budget"
          type="number"
          value={budget || ""}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <input
          id="food"
          type="number"
          value={foodBudget || ""}
          onChange={(e) => setFoodBudget(Number(e.target.value))}
        />
        <input
          id="travel"
          type="number"
          value={travelBudget || ""}
          onChange={(e) => setTravelBudget(Number(e.target.value))}
        />
        <input
          id="entertainment"
          type="number"
          value={entertainmentBudget || ""}
          onChange={(e) => setEntertainmentBudget(Number(e.target.value))}
        />
        <button type="submit">Start Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
