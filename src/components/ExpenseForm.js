import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTransactionEntry({
        id: Date.now(),   // Cypress requires ID
        name,
        category,
        amount: Number(amount),
      })
    );

    setName("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="form-container">
      <div className="title">Add Expense</div>

      <form onSubmit={handleSubmit}>
        <input
          id="expense-name"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="food">food</option>
          <option value="travel">travel</option>
          <option value="entertainment">entertainment</option>
          <option value="others">others</option>
        </select>

        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button id="add-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
