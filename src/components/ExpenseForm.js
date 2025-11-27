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

    // Dispatch required updates
    dispatch(
      updateTotalExpense({ amount: Number(amount), operation: "add" })
    );
    dispatch(addTransactionEntry(expenseData));

    // Reset fields
    setExpenseName("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="expense-container">
      
      {/* ✔ CLASS must be "title" */}
      <div className="title">New Expense Form</div>

      {/* ✔ ID must be expense-form1 */}
      <form id="expense-form1" onSubmit={handleSubmit}>
        
        {/* EXPENSE NAME */}
        {/* ✔ Label must have htmlFor="expense-name" */}
        <label htmlFor="expense-name">expense-name</label>

        {/* ✔ Input must have id="expense-name" */}
        <input
          id="expense-name"
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        {/* CATEGORY */}
        {/* ✔ Label must have htmlFor="category-select" */}
        <label htmlFor="category-select">category-select</label>

        {/* ✔ Select must have id="category-select" */}
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
        {/* ✔ Label must have htmlFor="expense-amount" */}
        <label htmlFor="expense-amount">expense-amount</label>

        {/* ✔ Input must have id="expense-amount" */}
        <input
          id="expense-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        {/* ✔ Must have type="submit" */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
