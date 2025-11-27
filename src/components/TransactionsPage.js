import React from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const TransactionsPage = () => {
  return (
    <div>
      <h2>Your Transactions</h2>

      {/* Cypress checks if form renders */}
      <ExpenseForm />

      <ExpenseList />
    </div>
  );
};

export default TransactionsPage;
