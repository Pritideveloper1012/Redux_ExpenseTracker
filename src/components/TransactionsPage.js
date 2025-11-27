import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategoricalBudget,
  updateMonthlyBudget,
  updateUserName,
} from "../redux/userSlice";
import {
  addTransactionEntry,
  removeAllTransactions,
} from "../redux/transactionSlice";
import { resetAllExpense, updateTotalExpense, updateCategoricalExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const transactions = useSelector(
    (state) => state.transactions.transactionList
  );

  const [food, setFood] = useState(user.categoricalBudget.food);
  const [travel, setTravel] = useState(user.categoricalBudget.travel);
  const [entertainment, setEntertainment] = useState(
    user.categoricalBudget.entertainment
  );
  const [totalBudget, setTotalBudget] = useState(user.monthlyBudget);

  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Update existing budget
  const handleUpdateBudget = () => {
    const catTotal = Number(food) + Number(travel) + Number(entertainment);
    if (catTotal > Number(totalBudget)) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    const others = Number(totalBudget) - catTotal;

    dispatch(updateMonthlyBudget(Number(totalBudget)));
    dispatch(
      updateCategoricalBudget({
        food: Number(food),
        travel: Number(travel),
        entertainment: Number(entertainment),
        others: others,
      })
    );

    alert("Budget updated successfully!");
  };

  // Start new tracker
  const handleNewTracker = () => {
    dispatch(removeAllTransactions());
    dispatch(updateUserName(""));
    dispatch(updateMonthlyBudget(""));
    dispatch(
      updateCategoricalBudget({
        food: "",
        travel: "",
        entertainment: "",
        others: 0,
      })
    );
    dispatch(resetAllExpense());

    setFood("");
    setTravel("");
    setEntertainment("");
    setTotalBudget("");

    navigate("/");
  };

  // Add expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseName || !expenseCategory || !expenseAmount) {
      alert("All fields are required!");
      return;
    }

    const expenseAmountNum = Number(expenseAmount);
    if (expenseAmountNum <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    dispatch(
      addTransactionEntry({
        id: Date.now(),
        name: expenseName,
        category: expenseCategory,
        amount: expenseAmountNum,
      })
    );

    dispatch(updateTotalExpense({ amount: expenseAmountNum, operation: "add" }));
    dispatch(updateCategoricalExpense({ category: expenseCategory, amount: expenseAmountNum, operation: "add" }));

    setExpenseName("");
    setExpenseCategory("");
    setExpenseAmount("");
  };

  // Calculate Insights
  const calculateCategorySpent = (category) =>
    transactions
      .filter((tx) => tx.category === category)
      .reduce((acc, tx) => acc + tx.amount, 0);

  const categories = ["food", "travel", "entertainment", "others"];

  return (
    <div>
      <h2>Welcome, {user.userName}</h2>

      {/* Budget Section */}
      <div>
        <h3>Update Budgets</h3>
        <input
          id="budget"
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          placeholder="Total Budget"
        />
        <input
          id="food"
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Food Budget"
        />
        <input
          id="travel"
          type="number"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
          placeholder="Travel Budget"
        />
        <input
          id="entertainment"
          type="number"
          value={entertainment}
          onChange={(e) => setEntertainment(e.target.value)}
          placeholder="Entertainment Budget"
        />

        <button id="new-update" onClick={handleUpdateBudget}>
          Update Tracker
        </button>
        <button id="clear" onClick={handleNewTracker}>
          Start New Tracker
        </button>
      </div>

      {/* Insights Section */}
      <h3>Insights</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Allocated Budget</th>
            <th>Spent</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            const allocated = user.categoricalBudget[cat] || 0;
            const spent = calculateCategorySpent(cat);
            return (
              <tr key={cat}>
                <td>{cat}</td>
                <td>{allocated}</td>
                <td>{spent}</td>
                <td>{allocated - spent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add Expense Section */}
      <div>
        <div className="title" id="title">New Expense Form</div>
        <form className="expense-form1" id="expense-form1" onSubmit={handleAddExpense}>
          <label htmlFor="expense-name">Expense Name:</label>
          <input
            id="expense-name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <label htmlFor="category-select">Select category:</label> {/* Changed to match test */}
          <select
            id="category-select"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />

          <button type="submit">Add</button>
        </form>
      </div>

      {/* Expense Table */}
      <h3>Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id}>
              <td>{index + 1}</td>
              <td>{tx.name}</td>
              <td>{tx.category}</td>
              <td>{tx.amount}</td>
              <td>
                <button onClick={() => dispatch(removeAllTransactions())}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
