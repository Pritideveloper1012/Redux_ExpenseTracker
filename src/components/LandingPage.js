import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !budget || !food || !travel || !entertainment) {
      alert("All fields are required!");
      return;
    }

    const totalBudget = Number(budget);
    const catTotal = Number(food) + Number(travel) + Number(entertainment);

    if (catTotal > totalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    const others = totalBudget - catTotal;

    // Reset transactions
    dispatch(removeAllTransactions());

    // Update Redux state
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(totalBudget));
    dispatch(
      updateCategoricalBudget({
        food: Number(food),
        travel: Number(travel),
        entertainment: Number(entertainment),
        others: others,
      })
    );

    // Clear form
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");

    // Navigate to Transactions page
    navigate("/tracker");
  };

  const handleReset = () => {
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");
    dispatch(removeAllTransactions());
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>

      <form name="landing-page-form" onSubmit={handleSubmit}>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Total Budget" />
        <input id="food" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food Budget" />
        <input id="travel" value={travel} onChange={(e) => setTravel(e.target.value)} placeholder="Travel Budget" />
        <input id="entertainment" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} placeholder="Entertainment Budget" />

        <button id="new-update" type="submit">Update Tracker</button>
        <button id="clear" type="button" onClick={handleReset}>Start New Tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
