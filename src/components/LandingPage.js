import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


// Redux actions
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import store from "../redux/store";

if (window.Cypress && !window.store) {
  window.store = store;
}

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: No empty fields
    if (!name || !totalBudget || !food || !travel || !entertainment) {
      alert("All fields are required");
      return;
    }

    const total = Number(totalBudget);
    const foodBudget = Number(food);
    const travelBudget = Number(travel);
    const entertainmentBudget = Number(entertainment);

    // Validation: Total budget > 0
    if (total <= 0) {
      alert("Total budget must be greater than 0");
      return;
    }

    const sumCategories = foodBudget + travelBudget + entertainmentBudget;

    // If sum of categories > totalBudget, show alert
    if (sumCategories > total) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    // Calculate Others category
    const others = total - sumCategories;

    // Dispatch to Redux store
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(total));
    dispatch(updateCategoricalBudget({
      food: foodBudget,
      travel: travelBudget,
      entertainment: entertainmentBudget,
      other: others,
    }));

    // Reset all previous expenses
    dispatch(resetAllExpense());

    // Redirect to Transactions Page
    navigate("/tracker");
  };

  return (
    <div className="landing-page">
      <h1>Expense Tracker</h1>
      <form name="landing-page-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="budget">Total Budget:</label>
          <input
            id="budget"
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="food">Food:</label>
          <input
            id="food"
            type="number"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="travel">Travel:</label>
          <input
            id="travel"
            type="number"
            value={travel}
            onChange={(e) => setTravel(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="entertainment">Entertainment:</label>
          <input
            id="entertainment"
            type="number"
            value={entertainment}
            onChange={(e) => setEntertainment(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LandingPage;
