import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";
import { useSelector } from "react-redux";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { transactionList } = useSelector((state) => state.transactions);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !amount) {
      alert("All fields are required!");
      return;
    }

    dispatch(
      addTransactionEntry({
        id: Date.now(),
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
      <div className="title" id="title">
        New Expense Form
      </div>

      <form id="expense-form1" onSubmit={handleSubmit}>
        <label htmlFor="expense-name">Expense Name</label>
        <input
          id="expense-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>

        <label htmlFor="expense-amount">Amount</label>
        <input
          id="expense-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
