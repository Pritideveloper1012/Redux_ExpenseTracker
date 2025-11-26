import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";
import { updateCategoricalExpense, updateTotalExpense } from "../redux/expenseSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [budget, setBudget] = useState(0); // Cypress expects input#budget

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!expenseName || !budget) {
      alert("All fields are required");
      return;
    }

    const amount = Number(budget);

    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name: expenseName,
        category: expenseCategory,
        amount,
      })
    );

    dispatch(updateCategoricalExpense({ category: expenseCategory, amount }));

    setExpenseName("");
    setBudget(0);
  };

  return (
    <div className="expense-form-wrapper">
      <h2>Add Expense</h2>
      <form id="expense-form1" className="expense-form1" onSubmit={handleAddExpense}>
        <input
          id="expense-name"
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          id="budget" // MUST match Cypress
          type="number"
          placeholder="Amount"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <select
          id="category-select"
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
