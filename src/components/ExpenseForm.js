import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const categories = useSelector((state) => state.expense.categories);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  const categorySpent = { food: 0, travel: 0, entertainment: 0, other: 0 };
  transactions.forEach(tx => categorySpent[tx.category] += tx.amount);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !category) {
      alert("All fields are required");
      return;
    }

    const numAmount = Number(amount);

    if (categorySpent[category] + numAmount > categories[category]) {
      const confirmAdd = window.confirm("Expense exceeds category budget. Do you want to add it?");
      if (!confirmAdd) return;
    }

    dispatch(addTransactionEntry({ id: Date.now(), name, category, amount: numAmount }));

    setName("");
    setAmount("");
  };

  return (
    <section className="new-expense">
      <h2>New Expense Form</h2>
      <form id="expense-form1" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expense-name">Expense Name:</label>
          <input id="expense-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="category-select">Category:</label>
          <select id="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="expense-amount">Amount:</label>
          <input id="expense-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ExpenseForm;
