import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAllTransactions } from "../redux/transactionSlice";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const handleStart = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !budget || !food || !travel || !entertainment) {
      alert("All fields are required!");
      return;
    }

    const totalBudget = Number(budget);
    const foodBudget = Number(food);
    const travelBudget = Number(travel);
    const entertainmentBudget = Number(entertainment);

    const sumCategories = foodBudget + travelBudget + entertainmentBudget;

    if (sumCategories > totalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    const othersBudget = totalBudget - sumCategories;

    // Reset previous transactions
    dispatch(removeAllTransactions());

    // Update Redux store
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(totalBudget));
    dispatch(
      updateCategoricalBudget({
        food: foodBudget,
        travel: travelBudget,
        entertainment: entertainmentBudget,
        others: othersBudget,
      })
    );

    // Reset form fields
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");

    // Navigate to Transactions page
    navigate("/tracker");
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>

      <form name="landing-page-form" onSubmit={handleStart}>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter Total Budget"
        />
        <input
          id="food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Food Budget"
        />
        <input
          id="travel"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
          placeholder="Travel Budget"
        />
        <input
          id="entertainment"
          value={entertainment}
          onChange={(e) => setEntertainment(e.target.value)}
          placeholder="Entertainment Budget"
        />

        <button type="submit" id="new-update">
          Start / Update Tracker
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
