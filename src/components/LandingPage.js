import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAllTransactions } from "../redux/transactionSlice";
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
  const [budget, setBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const handleStart = () => {
    if (!name || !budget || !food || !travel || !entertainment) {
      alert("All fields are required!");
      return;
    }

    const totalBudget = Number(budget);
    const sumCategorical = Number(food) + Number(travel) + Number(entertainment);

    if (sumCategorical > totalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    dispatch(removeAllTransactions());

    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(totalBudget));
    dispatch(
      updateCategoricalBudget({
        food: Number(food),
        travel: Number(travel),
        entertainment: Number(entertainment),
        others: totalBudget - sumCategorical,
      })
    );

    // Reset form fields
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");

    navigate("/tracker");
  };

  const handleReset = () => {
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

        <button id="new-update" type="button" onClick={handleStart}>
          Start / Update Tracker
        </button>
        <button id="clear" type="button" onClick={handleReset}>
          Start New Tracker
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
