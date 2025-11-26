import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} from "../redux/expenseSlice";
import {
  addTransactionEntry,
  removeAllTransactions,
} from "../redux/transactionSlice";

function ExpenseForm() {
  const dispatch = useDispatch();

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "food",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amt = Number(expense.amount);

    const transaction = {
      id: Date.now(),
      name: expense.name,
      amount: amt,
      category: expense.category,
    };

    dispatch(addTransactionEntry(transaction));
    dispatch(updateTotalExpense({ amount: amt, operation: "add" }));
    dispatch(
      updateCategoricalExpense({
        category: expense.category,
        amount: amt,
        operation: "add",
      })
    );

    setExpense({ name: "", amount: "", category: "food" });
  };

  const handleReset = () => {
    // Reset all Redux state
    dispatch(removeAllTransactions());
    dispatch(resetAllExpense());

    // Reset local form state
    setExpense({ name: "", amount: "", category: "food" });
  };

  return (
    <div className="expense-form1">
      <form onSubmit={handleSubmit}>
        <input
          id="expense-name"
          name="name"
          value={expense.name}
          onChange={handleChange}
        />

        <input
          id="expense-amount"
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />

        <select
          id="expense-category"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="food">food</option>
          <option value="travel">travel</option>
          <option value="entertainment">entertainment</option>
          <option value="others">others</option>
        </select>

        <button id="add-expense" type="submit">
          Add Expense
        </button>

        {/* RESET BUTTON for Cypress */}
        <button id="clear" type="button" onClick={handleReset}>
          Reset All
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
