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
      id: Date.now(),
      name: expenseName,
      category: category,
      amount: Number(amount),
    };

    dispatch(
      updateTotalExpense({ amount: Number(amount), operation: "add" })
    );
    dispatch(addTransactionEntry(expenseData));

    setExpenseName("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="expense-container">
      
      {/* Cypress expects class .title */}
      <div className="title">New Expense Form</div>

      {/* Cypress expects id="expense-form1" */}
      <form id="expense-form1" onSubmit={handleSubmit}>

        {/* EXPENSE NAME */}
        <label htmlFor="expense-name">Expense Name:</label>
        <input
          id="expense-name"
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        {/* CATEGORY */}
        <label htmlFor="category-select">Select category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="food">food</option>
          <option value="travel">travel</option>
          <option value="entertainment">entertainment</option>
          <option value="others">others</option>
        </select>

        {/* AMOUNT */}
        <label htmlFor="expense-amount">Expense Amount:</label>
        <input
          id="expense-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
