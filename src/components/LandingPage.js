import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetAllBudget,
} from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";

function LandingPageForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    monthlyBudget: "",
    food: "",
    travel: "",
    entertainment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserName(form.name));
    dispatch(updateMonthlyBudget(form.monthlyBudget));
    dispatch(
      updateCategoricalBudget({
        food: form.food,
        travel: form.travel,
        entertainment: form.entertainment,
      })
    );

    navigate("/transactions"); // ⭐ Cypress expects THIS route
  };

  const handleReset = () => {
    dispatch(resetAllBudget());
    dispatch(removeAllTransactions());
    dispatch(resetAllExpense());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
        <input
          id="monthly-budget"
          name="monthlyBudget"
          value={form.monthlyBudget}
          onChange={handleChange}
        />

        <input id="food" name="food" value={form.food} onChange={handleChange} />
        <input
          id="travel"
          name="travel"
          value={form.travel}
          onChange={handleChange}
        />
        <input
          id="entertainment"
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
    </div>
  );
}

export default LandingPageForm;
