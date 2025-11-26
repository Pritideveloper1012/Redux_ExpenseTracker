import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTotalExpense,
  updateCategoricalExpense,
} from "../redux/expenseSlice";
import {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} from "../redux/transactionSlice";
import { useNavigate } from "react-router-dom"; // ✅ FIX: useNavigate import kiya for proper routing

const TransactionsPage = () => {
  const dispatch = useDispatch();
  // ✅ FIX: useNavigate hook use karna zaroori hai for proper routing (Test 1 fix)
  const navigate = useNavigate(); 
  
  const user = useSelector((state) => state.user) || { userName: "" };
  const budget =
    useSelector((state) => state.expenses) || {
      totalExpense: 0,
      categoricalExpense: { food: 0, travel: 0, entertainment: 0, others: 0 },
    };
  const transactions = useSelector(
    (state) => state.transactions.transactionList
  ) || [];

  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [filter, setFilter] = useState("All");

  const categorySpent = { food: 0, travel: 0, entertainment: 0, others: 0 };
  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) {
      alert("All fields are required");
      return;
    }

    const amount = Number(expenseAmount);

    // Check category budget
    if (categorySpent[expenseCategory] + amount > budget.categoricalExpense[expenseCategory]) {
      if (!window.confirm("Expense exceeds category budget. Continue?")) return;
    }

    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name: expenseName,
        category: expenseCategory,
        amount,
      })
    );

    dispatch(
      updateTotalExpense({
        amount,
        operation: "add",
      })
    );

    dispatch(
      updateCategoricalExpense({
        category: expenseCategory,
        amount,
        operation: "add",
      })
    );

    setExpenseName("");
    setExpenseAmount("");
  };

  const handleDelete = (id, category, amount) => {
    dispatch(removeTransactionEntry(id));
    
    dispatch(
      updateTotalExpense({
        amount,
        operation: "subtract",
      })
    );
    
    dispatch(
      updateCategoricalExpense({ category, amount, operation: "subtract" })
    );
  };

  const handleNewTracker = () => {
    dispatch(removeAllTransactions());
    // ✅ FIX 3: window.location.reload() ki jagah navigate use karein.
    // LandingPageForm reset test fail ho raha tha. Isse use '/' par redirect karna chahiye.
    navigate("/"); 
  };

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((tx) => tx.category === filter.toLowerCase());

  return (
    <div className="transactions-page">
      <h1>{user.userName || "User"} Expense Tracker</h1>

      <section className="new-expense">
        <h2 className="title">New Expense Form</h2>
        <form className="expense-form1" onSubmit={handleAddExpense}>
          <label htmlFor="transaction-expense-name">Expense Name</label>
          <input
            // ✅ FIX 4: ID change kiya taki LandingPage ID se clash na ho (input#name fix)
            id="transaction-expense-name" 
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <label htmlFor="category-select">Category</label>
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

          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />

          <button type="submit">Add</button>
        </form>
      </section>

      <button id="clear" onClick={handleNewTracker}>
        Start New Tracker
      </button>

      <div className="filters">
        {["All", "Food", "Travel", "Entertainment", "Others"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

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
                  <button
                    onClick={() => handleDelete(tx.id, tx.category, tx.amount)}
                  >
                    Delete
                  </button>
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