import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTotalExpense } from "../redux/expenseSlice";
import { addUser } from "../redux/userSlice"; // agar userSlice me addUser action hai
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");

  const [foodBudget, setFoodBudget] = useState("");
  const [travelBudget, setTravelBudget] = useState("");
  const [entertainmentBudget, setEntertainmentBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !totalBudget) {
      alert("Please fill all required fields");
      return;
    }

    const sumCategories =
      Number(foodBudget || 0) +
      Number(travelBudget || 0) +
      Number(entertainmentBudget || 0);

    if (sumCategories > Number(totalBudget)) {
      alert("Category budgets cannot exceed total budget");
      return;
    }

    dispatch(
      addUser({ name }) // user slice update
    );

    dispatch(
      updateTotalExpense({
        totalBudget: Number(totalBudget),
        categories: {
          food: Number(foodBudget || 0),
          travel: Number(travelBudget || 0),
          entertainment: Number(entertainmentBudget || 0),
          other: Number(totalBudget) - sumCategories,
        },
      })
    );

    navigate("/transactions");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Start Tracking</button>
      </form>
    </div>
  );
};

export default LandingPage;
