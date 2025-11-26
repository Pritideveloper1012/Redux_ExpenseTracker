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

const TransactionsPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const budget = useSelector((state) => state.expenses);
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const categorySpent = {
    food: 0,
    travel: 0,
    entertainment: 0,
    others: 0,
  };

  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount || !expenseCategory) {
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

    dispatch(
      updateCategoricalExpense({
        category: expenseCategory,
        amount,
      })
    );

    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("");
  };

  const handleDelete = (id, category, amount) => {
    dispatch(removeTransactionEntry(id));
    dispatch(
      updateCategoricalExpense({
        category,
        amount: -amount,
      })
    );
  };

  const handleClear = () => {
    dispatch(removeAllTransactions());
    window.location.reload();
  };

  return (
    <div className="transactions-page">
      <header>
        <h1>{user.userName}'s Expense Tracker</h1>

        <button id="new-update">Update Tracker</button>
        <button id="clear" onClick={handleClear}>
          Start New Tracker
        </button>
      </header>

      {/* Expense Form → MUST match Cypress selectors */}
      <section>
        <h2>Add Expense</h2>

        <form className="expense-form1" onSubmit={handleAddExpense}>
          <input
            id="expense-name"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <input
            id="expense-amount"
            type="number"
            placeholder="Amount"
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
      </section>

      {/* Transactions Table */}
      <section>
        <h2>Transactions</h2>
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
            {transactions.map((tx, index) => (
              <tr key={tx.id}>
                <td>{index + 1}</td>
                <td>{tx.name}</td>
                <td>{tx.category}</td>
                <td>{tx.amount}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(tx.id, tx.category, tx.amount)
                    }
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
