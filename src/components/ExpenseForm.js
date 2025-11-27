import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTotalExpense } from "../redux/expenseSlice";
import { addTransactionEntry } from "../redux/transactionSlice";

function ExpenseForm() {
  const dispatch = useDispatch();

  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !category || !amount) return;

    const expenseData = {
      name: expenseName,
      category: category,
      amount: Number(amount),
    };

    dispatch(updateTotalExpense(expenseData));
    dispatch(addTransactionEntry(expenseData));

    setExpenseName("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="expense-container">
      
      {/* ✔ THIS MUST MATCH CYPRESS: div.title */}
      <div className="title">New Expense Form</div>

      {/* ✔ IMPORTANT: Cypress checks .expense-form1 (CLASS) */}
      <form
        className="expense-form1"
        id="expense-form1"
        onSubmit={handleSubmit}
      >
        {/* Expense Name */}
        <label htmlFor="expense-name">Expense Name:</label>
        <input
          type="text"
          id="expense-name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        {/* Category */}
        <label htmlFor="category-select">Select category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>

        {/* Expense Amount */}
        <label htmlFor="expense-amount">Expense Amount:</label>
        <input
          type="number"
          id="expense-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Submit */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
