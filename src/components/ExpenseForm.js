import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);

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
      <div id="title">New Expense Form</div>

      <form className="expense-form1" onSubmit={handleSubmit}>

        <label htmlFor="expense-name">Expense Name:</label>
        <input
          id="expense-name"
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <label htmlFor="category-select">Select category:</label>
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

        <label htmlFor="expense-amount">Amount:</label>
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
