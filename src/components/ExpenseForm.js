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

    if (!expenseName || !category || !amount) {
      alert("All fields are required!");
      return;
    }

    const expenseAmount = Number(amount);
    if (expenseAmount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name: expenseName,
        category,
        amount: expenseAmount,
      })
    );

    setExpenseName("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="form-container">
      {/* Title ID required by Cypress */}
      <div id="title">New Expense Form</div>

      {/* FORM MUST HAVE id="expense-form1" */}
      <form id="expense-form1" onSubmit={handleSubmit}>

        {/* Expense Name */}
        <label htmlFor="expense-name" id="expense-name">
          Expense Name:
        </label>
        <input
          id="expense-name"
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        {/* Category */}
        <label htmlFor="category-select" id="category-select">
          Select category:
        </label>
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

        {/* Amount */}
        <label htmlFor="expense-amount" id="expense-amount">
          Amount:
        </label>
        <input
          id="expense-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Submit button - MUST be type submit */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
