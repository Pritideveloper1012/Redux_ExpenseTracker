import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { removeAllTransactions } from "../redux/transactionSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState(""); // MUST be entertainment

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !budget || !food || !travel || !entertainment) {
      alert("All fields are required");
      return;
    }

    const totalBudget = Number(budget);
    const totalCategories =
      Number(food) + Number(travel) + Number(entertainment);

    if (totalCategories > totalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return; // Do not navigate
    }

    const other = totalBudget - totalCategories;

    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(totalBudget));
    dispatch(
      updateCategoricalBudget({
        food: Number(food),
        travel: Number(travel),
        entertainment: Number(entertainment),
        other,
      })
    );

    navigate("/tracker");
  };

  const handleClear = () => {
    dispatch(removeAllTransactions());
    setName("");
    setBudget("");
    setFood("");
    setTravel("");
    setEntertainment("");
  };

  return (
    <div>
      <form name="landing-page-form" onSubmit={handleSubmit}>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <input id="food" value={food} onChange={(e) => setFood(e.target.value)} />
        <input id="travel" value={travel} onChange={(e) => setTravel(e.target.value)} />
        <input id="entertainment" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} />

        <button id="new-update" type="submit">New/Update Tracker</button>
        <button id="clear" type="button" onClick={handleClear}>Start new tracker</button>
      </form>
    </div>
  );
};

export default LandingPage;
