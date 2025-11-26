import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAllBudget } from "../redux/userSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";

const TransactionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);

  const handleNewTracker = () => {
    dispatch(resetAllBudget());
    dispatch(resetAllExpense());
    dispatch(removeAllTransactions());
    navigate("/"); // back to landing page
  };

  return (
    <div className="transactions-page">
      <h1>{userName}'s Expense Tracker</h1>

      <div className="buttons">
        <button id="new-update">Update Tracker</button>
        <button id="clear" onClick={handleNewTracker}>
          Start New Tracker
        </button>
      </div>

      {/* Expense Form Section */}
      <ExpenseForm />

      {/* Insights Section and Expenses Table can go here */}
    </div>
  );
};

export default TransactionsPage;
