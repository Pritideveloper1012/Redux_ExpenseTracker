import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetAllBudget, updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const handleStart = () => {
    // Validations
    const total = Number(budget);
    const catSum = Number(food) + Number(travel) + Number(entertainment);
    if (!name || !budget || !food || !travel || !entertainment) {
      alert("All fields are required");
      return;
    }
    if (total <= 0) {
      alert("Monthly budget must be greater than 0");
      return;
    }
    if (catSum > total) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    // Add remaining to Others
    const others = total - catSum;

    // Update Redux
    dispatch(removeAllTransactions());
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(total));
    dispatch(updateCategoricalBudget({ food: Number(food), travel: Number(travel), entertainment: Number(entertainment), others }));

    // Clear fields
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");

    navigate("/transactions");
  };

  const handleClear = () => {
    dispatch(resetAllBudget());
    dispatch(removeAllTransactions());
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>
      <form name="landing-page-form">
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
        <input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter Total Budget" />
        <input id="food" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food Budget" />
        <input id="travel" value={travel} onChange={(e) => setTravel(e.target.value)} placeholder="Travel Budget" />
        <input id="entertainment" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} placeholder="Entertainment Budget" />

        <button type="button" id="new-update" onClick={handleStart}>Start / Update Tracker</button>
        <button type="button" id="clear" onClick={handleClear}>Start New Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
