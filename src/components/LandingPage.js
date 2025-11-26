import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [foodBudget, setFoodBudget] = useState(0);
  const [travelBudget, setTravelBudget] = useState(0);
  const [entertainmentBudget, setEntertainmentBudget] = useState(0);

   const handleSubmit = (e) => {
    e.preventDefault();
    // form validations...

    Navigate("/transactions"); // 
  

    if (!name || !budget) {
      alert("All fields are required");
      return;
    }

    // Dispatch user info
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(Number(budget)));
    dispatch(
      updateCategoricalBudget({
        food: Number(foodBudget),
        travel: Number(travelBudget),
        entertainment: Number(entertainmentBudget),
      })
    );

    // Navigate to Transactions page (dummy here)
    window.location.href = "/transactions";
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Expense Tracker</h1>
      <form id="landing-form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="budget" // MUST match Cypress
          type="number"
          placeholder="Enter Monthly Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          id="food"
          type="number"
          placeholder="Food Budget"
          value={foodBudget}
          onChange={(e) => setFoodBudget(e.target.value)}
        />
        <input
          id="travel"
          type="number"
          placeholder="Travel Budget"
          value={travelBudget}
          onChange={(e) => setTravelBudget(e.target.value)}
        />
        <input
          id="entertainment"
          type="number"
          placeholder="Entertainment Budget"
          value={entertainmentBudget}
          onChange={(e) => setEntertainmentBudget(e.target.value)}
        />
        <button type="submit">Start Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
