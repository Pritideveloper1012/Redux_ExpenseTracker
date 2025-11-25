import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/transactionsSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const [filter, setFilter] = useState("All");

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((tx) => tx.category === filter.toLowerCase());

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
                <button onClick={() => dispatch(deleteTransaction(tx.id))}>
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
