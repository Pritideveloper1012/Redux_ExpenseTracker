import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user); // Ensure userName is available

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
      <div className="title">New Expense Form</div>

      <form id="expense-form1">
  <div id="title">New Expense Form</div>

  <label htmlFor="expense-name">Expense Name</label>
  <input id="expense-name" />

  <label htmlFor="category-select">Category</label>
  <select id="category-select"></select>

  <label htmlFor="expense-amount">Amount</label>
  <input id="expense-amount" />

  <button type="submit">Submit</button>
</form>

    </div>
  );
};

export default ExpenseForm;
