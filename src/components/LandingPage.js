import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAllTransactions } from "../redux/transactionSlice";
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
    dispatch(removeAllTransactions());

    dispatch(
      setUserDetails({
        name,
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

    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");

    navigate("/transactions"); // IMPORTANT
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>

      <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
      <input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter Total Budget" />
      <input id="food" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food Budget" />
      <input id="travel" value={travel} onChange={(e) => setTravel(e.target.value)} placeholder="Travel Budget" />
      <input id="entertainment" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} placeholder="Entertainment Budget" />

      <button id="new-update" onClick={handleStart}>
        Start new tracker
      </button>
    </div>
  );
};

export default LandingPage;
