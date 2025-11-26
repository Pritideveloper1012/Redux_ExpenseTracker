import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// ✅ FIX 1: Import required actions from expenseSlice
import { updateTotalExpense, updateCategoricalExpense } from "../redux/expenseSlice";
import { deleteTransaction } from "../redux/transactionSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  // Note: Check if 'transactions' should be accessed as state.transactions.transactionList
  // Assuming the structure is correct based on the previous context.
  const transactions = useSelector((state) => state.transactions.transactions); 
  const [filter, setFilter] = useState("All");

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((tx) => tx.category === filter.toLowerCase());

  // ✅ FIX 2: Create a function to handle both deletion and expense updates
  const handleDeleteTransaction = (id, category, amount) => {
    // 1. Delete the transaction from the list
    dispatch(deleteTransaction(id));

    // 2. Subtract the amount from Total Expense
    dispatch(
      updateTotalExpense({
        amount: amount,
        operation: "subtract",
      })
    );

    // 3. Subtract the amount from Categorical Expense
    dispatch(
      updateCategoricalExpense({
        category: category,
        amount: amount,
        operation: "subtract",
      })
    );
  };

  return (
    <section className="expenses-section">
      <div className="filters">
        {["All", "Food", "Travel", "Entertainment", "Other"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction</th>
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
                  // ✅ FIX 3: Call the new handler with all necessary data
                  onClick={() => handleDeleteTransaction(tx.id, tx.category, tx.amount)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ExpenseList;