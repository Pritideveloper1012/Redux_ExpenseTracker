import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";
import { updateCategoricalExpense } from "../redux/expenseSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) {
      alert("All fields are required");
      return;
    }

    const amt = Number(amount);

    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name,
        category,
        amount: amt,
      })
    );

    dispatch(
      updateCategoricalExpense({ category, amount: amt, operation: "add" })
    );

    setName("");
    setAmount("");
  };

  return (
    <form id="expense-form1" onSubmit={handleSubmit} className="expense-form1">
      <input
        id="expense-name"
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
      </select>
      <input
        id="expense-amount"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ExpenseForm;
