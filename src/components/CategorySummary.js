import React from "react";
import { useSelector } from "react-redux";

const CategorySummary = () => {
  const budget = useSelector((state) => state.budget);
  const transactions = useSelector((state) => state.transactions.transactions);

  const categorySpent = { food: 0, travel: 0, entertainment: 0, other: 0 };
  transactions.forEach((tx) => {
    categorySpent[tx.category] += tx.amount;
  });

  return (
    <section className="insights">
      <h2>Insights</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Allocated Budget</th>
            <th>Current Expense</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(budget.categories).map((cat) => {
            const allocated = budget.categories[cat];
            const spent = categorySpent[cat];
            const balance = allocated - spent;
            return (
              <tr key={cat}>
                <td>{cat.charAt(0).toUpperCase() + cat.slice(1)}</td>
                <td>{allocated}</td>
                <td>{spent}</td>
                <td>{balance}</td>
                <td>{spent <= allocated ? "Within Budget" : "Exceeded"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default CategorySummary;
