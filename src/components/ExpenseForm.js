import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../redux/transactionsSlice";
import store from "../redux/store";

if (window.Cypress && !window.store) {
  window.store = store;
}

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget);
  const transactions = useSelector((state) => state.transactions.transactions);

  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Calculate spent per category
  const categorySpent = { food: 0, travel: 0, entertainment: 0, other: 0 };
  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = Number(expenseAmount);
    if (!expenseName || !expenseCategory || !expenseAmount) {
      alert("All fields are required");
      return;
    }

    if (categorySpent[expenseCategory] + amount > budget.categories[expenseCategory]) {
      const confirmAdd = window.confirm(
        "Expense exceeds category budget. Do you want to add it?"
      );
      if (!confirmAdd) return;
    }

    dispatch(
      addTransaction({
        id: Date.now(),
        name: expenseName,
        category: expenseCategory,
        amount: amount,
      })
    );

    setExpenseName("");
    setExpenseAmount("");
  };

  return (
    <section className="new-expense">
      <div id="title">
        <h2>New Expense Form</h2>
      </div>
      <form id="expense-form1" onSubmit={handleAddExpense}>
        <div>
          <label htmlFor="expense-name">Expense Name:</label>
          <input
            id="expense-name"
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
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
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ExpenseForm;
