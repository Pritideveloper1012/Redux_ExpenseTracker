// src/components/ExpenseForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount || !expenseCategory) {
      return;
    }

    dispatch(
      addExpense({
        name: expenseName,
        amount: Number(expenseAmount),
        category: expenseCategory,
      })
    );

    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("");
  };

  return (
    <form className="expense-form1" onSubmit={handleSubmit}>
      <input
        id="expense-name"
        placeholder="Expense Name"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
      />

      <input
        id="expense-amount"
        placeholder="Amount"
        type="number"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
      />

      <select
        id="expense-category"
        value={expenseCategory}
        onChange={(e) => setExpenseCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="entertainment">Entertainment</option>
        <option value="others">Others</option>
      </select>

      <button id="expense-submit" type="submit">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
