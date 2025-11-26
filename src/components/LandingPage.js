import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [foodBudget, setFoodBudget] = useState("");
  const [travelBudget, setTravelBudget] = useState("");
  const [entertainmentBudget, setEntertainmentBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !budget || !foodBudget || !travelBudget || !entertainmentBudget) {
      alert("All fields are required");
      return;
    }

    const totalBudget = Number(budget);
    const sumCategory = Number(foodBudget) + Number(travelBudget) + Number(entertainmentBudget);
    let otherBudget = totalBudget - sumCategory;

    if (sumCategory > totalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    // Dispatch to Redux
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(totalBudget));
    dispatch(
      updateCategoricalBudget({
        food: Number(foodBudget),
        travel: Number(travelBudget),
        entertainment: Number(entertainmentBudget),
        other: otherBudget >= 0 ? otherBudget : 0,
      })
    );

    // Navigate to Transactions Page
    navigate("/tracker");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Expense Tracker</h1>
      <form id="landing-page-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="budget">Total Budget</label>
        <input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />

        <label htmlFor="food">Food Budget</label>
        <input id="food" type="number" value={foodBudget} onChange={(e) => setFoodBudget(e.target.value)} />

        <label htmlFor="travel">Travel Budget</label>
        <input id="travel" type="number" value={travelBudget} onChange={(e) => setTravelBudget(e.target.value)} />

        <label htmlFor="entertainment">Entertainment Budget</label>
        <input
          id="entertainment"
          type="number"
          value={entertainmentBudget}
          onChange={(e) => setEntertainmentBudget(e.target.value)}
        />

        <button type="submit">Start Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
