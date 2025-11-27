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

  // This function is now the form's onSubmit handler (Fix for Test 2)
  const handleStart = (e) => {
    if (e) {
        e.preventDefault(); 
    }
    
    // Validations (unchanged)
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

    // Update Redux (unchanged)
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

    // FIX for Test 1 (Navigation)
    navigate("/tracker"); 
  };

  // FIX 3: Added navigation back to the Landing Page (/)
  const handleClear = () => {
    dispatch(resetAllBudget());
    dispatch(removeAllTransactions());
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");
    
    // CRITICAL FIX: Navigate back to the page where the form is located
    navigate("/"); 
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>
      {/* Retained onSubmit={handleStart} for Test compatibility */}
      <form id="form" name="landing-page-form" onSubmit={handleStart}>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
        <input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter Total Budget" />
        <input id="food" type="number" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food Budget" />
        <input id="travel" type="number" value={travel} onChange={(e) => setTravel(e.target.value)} placeholder="Travel Budget" />
        <input id="entertainment" type="number" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} placeholder="Entertainment Budget" />

        {/* Retained type="submit" for Test compatibility */}
        <button type="submit" id="new-update">Start / Update Tracker</button> 
        <button type="button" id="clear" onClick={handleClear}>Start New Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
