import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTotalExpense, updateCategoricalExpense } from "../redux/expenseSlice"; // update budget/expense slice
import {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} from "../redux/transactionSlice"; // correct transaction slice actions

const TransactionsPage = () => {
  const dispatch = useDispatch();

  // Selectors
  const user = useSelector((state) => state.user) || { name: "" };
  const budget = useSelector((state) => state.expenses) || {
    totalBudget: 0,
    categories: { food: 0, travel: 0, entertainment: 0, other: 0 },
  };
  const transactions = useSelector((state) => state.transactions.transactions) || [];

  // Local state
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [filter, setFilter] = useState("All");

  // Calculate spent per category
  const categorySpent = { food: 0, travel: 0, entertainment: 0, other: 0 };
  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  // Add new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) {
      alert("All fields are required");
      return;
    }

    const amount = Number(expenseAmount);
    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name: expenseName,
        category: expenseCategory,
        amount: amount,
      })
    );

    // Update budget spent
    dispatch(updateCategoricalExpense({ category: expenseCategory, amount }));

    setExpenseName("");
    setExpenseAmount("");
  };

  // Delete expense
  const handleDelete = (id, category, amount) => {
    dispatch(removeTransactionEntry(id));
    dispatch(updateCategoricalExpense({ category, amount: -amount }));
  };

  // Start new tracker
  const handleNewTracker = () => {
    dispatch(removeAllTransactions());
    window.location.reload();
  };

  // Update budgets
  const handleUpdateBudget = () => {
    const food = Number(prompt("New Food budget", budget.categories.food));
    const travel = Number(prompt("New Travel budget", budget.categories.travel));
    const entertainment = Number(prompt("New Entertainment budget", budget.categories.entertainment));
    const totalBudget = Number(prompt("New Total Budget", budget.totalBudget));

    const sum = food + travel + entertainment;
    if (sum > totalBudget) {
      alert("Category budgets exceed total budget");
      return;
    }

    dispatch(
      updateTotalExpense({
        totalBudget,
        categories: { food, travel, entertainment, other: totalBudget - sum },
      })
    );
  };

  // Filtered transactions
  const filteredTransactions =
    filter === "All" ? transactions : transactions.filter((tx) => tx.category === filter.toLowerCase());

  return (
    <div className="transactions-page">
      <header>
        <h1>{user.name || "User"} Expense Tracker</h1>

        <button id="new-update" onClick={handleUpdateBudget}>
          Update Tracker
        </button>

        <button id="clear" onClick={handleNewTracker}>
          Start New Tracker
        </button>
      </header>

      {/* Insights */}
      <section className="insights">
        <h2>Insights</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Allocated</th>
              <th>Spent</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(budget.categories || {}).map((cat) => {
              const alloc = budget.categories[cat] || 0;
              const spent = categorySpent[cat] || 0;
              return (
                <tr key={cat}>
                  <td>{cat.toUpperCase()}</td>
                  <td>{alloc}</td>
                  <td>{spent}</td>
                  <td>{alloc - spent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Add Expense */}
      <section className="new-expense">
        <h2>New Expense</h2>
        <form onSubmit={handleAddExpense} id="expense-form1">
          <input
            id="expense-name"
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
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
          <input
            id="expense-amount"
            type="number"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      {/* Filters */}
      <div className="filters">
        {["All", "Food", "Travel", "Entertainment", "Other"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <section className="expenses-table">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
              <tr key={tx.id}>
                <td>{index + 1}</td>
                <td>{tx.name}</td>
                <td>{tx.category}</td>
                <td>{tx.amount}</td>
                <td>
                  <button onClick={() => handleDelete(tx.id, tx.category, tx.amount)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TransactionsPage;
