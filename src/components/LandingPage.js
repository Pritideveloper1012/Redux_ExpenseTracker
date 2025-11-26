import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetAllBudget
} from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";

function LandingPageForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    budget: "",
    food: "",
    travel: "",
    entertainment: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserName(form.name));
    dispatch(updateMonthlyBudget(form.budget));
    dispatch(
      updateCategoricalBudget({
        food: form.food,
        travel: form.travel,
        entertainment: form.entertainment
      })
    );

    navigate("/transactions");
  };

  const handleReset = () => {
    dispatch(resetAllBudget());
    dispatch(removeAllTransactions());
    dispatch(resetAllExpense());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        id="budget"
        name="budget"
        value={form.budget}
        onChange={handleChange}
      />

      <input
        id="food-budget"
        name="food"
        value={form.food}
        onChange={handleChange}
      />

      <input
        id="travel-budget"
        name="travel"
        value={form.travel}
        onChange={handleChange}
      />

      <input
        id="entertainment-budget"
        name="entertainment"
        value={form.entertainment}
        onChange={handleChange}
      />

      <button id="new-update" type="submit">
        New/Update tracker
      </button>

      <button id="reset-button" type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default LandingPageForm;
