import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTotalExpense, updateCategoricalExpense } from "../redux/expenseSlice";
import { removeTransactionEntry } from "../redux/transactionSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactions.transactionList
  );

  const [filter, setFilter] = useState("All");

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((tx) => tx.category === filter.toLowerCase());

  const handleDeleteTransaction = (id, category, amount) => {
    dispatch(removeTransactionEntry(id));

    dispatch(
      updateTotalExpense({
        amount,
        operation: "subtract",
      })
    );

    dispatch(
      updateCategoricalExpense({
        category,
        amount,
        operation: "subtract",
      })
    );
  };

  return (
    <section className="expenses-section">
      <div className="filters">
        {["All", "Food", "Travel", "Entertainment", "Others"].map((f) => (
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
                  onClick={() =>
                    handleDeleteTransaction(tx.id, tx.category, tx.amount)
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
  );
};

export default ExpenseList;
