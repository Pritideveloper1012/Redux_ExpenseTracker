import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";

import store from "../redux/store";

if (window.Cypress && !window.store) {
  window.store = store;
}

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.transactions);
  const categories = useSelector((state) => state.expense.categories);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  // category-wise spent calculation
  const categorySpent = { food: 0, travel: 0, entertainment: 0, other: 0 };
  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount) {
      alert("All fields are required");
      return;
    }

    const numAmount = Number(amount);

    // category limit check
    if (categorySpent[category] + numAmount > categories[category]) {
      const addAnyway = window.confirm(
        "Expense exceeds category budget. Do you want to continue?"
      );
      if (!addAnyway) return;
    }

    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name,
        category,
        amount: numAmount,
      })
    );

    // reset
    setName("");
    setAmount("");
    setCategory("food");
  };

  return (
    <section className="new-expense">
      <h2>New Expense Form</h2>

      {/* 🔥 Cypress expects this exact id */}
      <form id="expense-form" onSubmit={handleSubmit} name="expense-form">
        <div>
          <label htmlFor="expense-name">Expense Name:</label>
          <input
            id="expense-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category-select">Category:</label>
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
        </div>

        <div>
          <label htmlFor="expense-amount">Amount:</label>
          <input
            id="expense-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Cypress checks this button exists */}
        <button id="expense-submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ExpenseForm;
