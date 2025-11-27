import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const totalExpense = useSelector((state) => state.expense.totalExpense);
  const categoricalExpense = useSelector(
    (state) => state.expense.categoricalExpense
  );

  return (
    <div className="landing-container">
      <div className="title">Xpense Tracker</div>

      <div className="card">
        <div>Total Expense</div>
        <div id="total-expense">₹{totalExpense}</div>
      </div>

      <div className="card">
        <div>Category-wise Expense</div>
        <ul id="categorical-expense">
          <li>food: ₹{categoricalExpense.food}</li>
          <li>travel: ₹{categoricalExpense.travel}</li>
          <li>entertainment: ₹{categoricalExpense.entertainment}</li>
          <li>others: ₹{categoricalExpense.others}</li>
        </ul>
      </div>

      <button id="track-btn" onClick={() => navigate("/tracker")}>
        Track Expenses
      </button>
    </div>
  );
};

export default LandingPage;
