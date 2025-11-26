// src/components/TransactionsPage.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} from "../redux/expenseSlice";
import {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} from "../redux/transactionSlice";

const TransactionsPage = () => {
  const dispatch = useDispatch();

  // Redux state
  const user = useSelector((state) => state.user) || { userName: "User" };
  const expenses = useSelector((state) => state.expenses) || {
    totalExpense: 0,
    categoricalExpense: { food: 0, travel: 0, entertainment: 0, others: 0 },
  };
  const transactions = useSelector((state) => state.transactions.transactions) || [];

  // Local state
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [filter, setFilter] = useState("All");

  // Calculate category-wise spent
  const categorySpent = { food: 0, travel: 0, entertainment: 0, others: 0 };
  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  // Add expense
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
        amount,
      })
    );

    dispatch(updateCategoricalExpense({ category: expenseCategory, amount }));

    setExpenseName("");
    setExpenseAmount("");
  };

  // Delete expense
  const handleDelete = (id, category, amount) => {
    dispatch(removeTransactionEntry(id));
    dispatch(updateCategoricalExpense({ category, amount: -amount }));
  };

  // Reset tracker
  const handleNewTracker = () => {
    dispatch(removeAllTransactions());
    dispatch(resetAllExpense());
    window.location.reload();
  };

  // Filtered transactions
  const filteredTransactions =
    filter === "All" ? transactions : transactions.filter((tx) => tx.category === filter.toLowerCase());

  return (
    <div className="transactions-page">
      <header>
        <h1>{user.userName || "User"} Expense Tracker</h1>
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
              <th>Spent</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(expenses.categoricalExpense).map((cat) => {
              const spent = expenses.categoricalExpense[cat] || 0;
              return (
                <tr key={cat}>
                  <td>{cat.charAt(0).toUpperCase() + cat.slice(1)}</td>
                  <td>{spent}</td>
                  <td>{Math.max(0, (expenses.totalExpense || 0) - spent)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Add Expense */}
      <section className="new-expense">
        <h2>New Expense</h2>
        <form onSubmit={handleAddExpense} className="expense-form1" id="expense-form1">
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
            <option value="others">Others</option>
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
        {["All", "Food", "Travel", "Entertainment", "Others"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
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
