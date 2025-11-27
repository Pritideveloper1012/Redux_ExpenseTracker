import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetAllTransactions } from "../redux/transactionSlice";
import { setUserDetails } from "../redux/userSlice";
import { setCategoricalBudget } from "../redux/expenseSlice";
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
    dispatch(resetAllTransactions());

    dispatch(
      setUserDetails({
        name: name,
        totalBudget: Number(budget),
      })
    );

    dispatch(
      setCategoricalBudget({
        food: Number(food),
        travel: Number(travel),
        entertainment: Number(entertainment),
        others: 0,
      })
    );

    // Clear inputs
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");

    navigate("/transactions");
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>

      <input
        id="name"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        id="budget"
        placeholder="Enter Total Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <input
        id="food"
        placeholder="Food Budget"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <input
        id="travel"
        placeholder="Travel Budget"
        value={travel}
        onChange={(e) => setTravel(e.target.value)}
      />

      <input
        id="entertainment"
        placeholder="Entertainment Budget"
        value={entertainment}
        onChange={(e) => setEntertainment(e.target.value)}
      />

      {/* IMPORTANT → Cypress expects this ID */}
      <button id="new-update" onClick={handleStart}>
        Start new tracker
      </button>
    </div>
  );
};

export default LandingPage;
