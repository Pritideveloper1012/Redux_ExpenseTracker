import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransactionEntry,
} from "../redux/transactionSlice";
import {
  updateTotalExpense,
  updateCategoricalExpense,
} from "../redux/expenseSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const categoricalBudget = useSelector((state) => state.user.categoricalBudget);

  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !amount) {
      alert("All fields are required");
      return;
    }

    if (amount > categoricalBudget[category]) {
      const proceed = window.confirm(
        "Expense exceeds budget for this category. OK to add anyway?"
      );
      if (!proceed) return;
    }

    dispatch(addTransactionEntry({ name: expenseName, category, amount }));
    dispatch(updateTotalExpense(amount));
    dispatch(updateCategoricalExpense({ category, amount }));

    // Reset form
    setExpenseName("");
    setCategory("food");
    setAmount(0);
  };

  return (
    <div>
      <h2 className="title">New Expense Form</h2>
      <form id="expense-form1" onSubmit={handleSubmit}>
        <label htmlFor="expense-name">Expense Name</label>
        <input
          id="expense-name"
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="expense-amount">Amount</label>
        <input
          id="expense-amount"
          type="number"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
