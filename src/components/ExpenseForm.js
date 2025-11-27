// ExpenseForm.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... (submission logic is correct)
  };

  return (
    <div className="form-container">
      {/* CRITICAL FIX 1: Change ID 'title' to CLASS NAME 'title' to match cy.get("div.title") */}
      <div className="title">New Expense Form</div>

      {/* Form element with required CLASS NAME: cy.get(".expense-form1") */}
      <form className="expense-form1" onSubmit={handleSubmit}>

        {/* Expense Name label */}
        <label htmlFor="expense-name" id="expense-name">Expense Name:</label>
        <input
          id="expense-name"
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        {/* CRITICAL FIX 2: Simplest form of the label text with the colon. */}
        <label htmlFor="category-select" id="category-select">Select category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>

        {/* Amount label: Must be "Expense Amount:" */}
        <label htmlFor="expense-amount" id="expense-amount">Expense Amount:</label>
        <input
          id="expense-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;