import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  totalBudget: 0,
  categories: {
    food: 0,
    travel: 0,
    entertainment: 0,
    other: 0,
  },
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget: (state, action) => {
      const { name, totalBudget, categories } = action.payload;
      state.name = name;
      state.totalBudget = totalBudget;
      state.categories = categories;
    },
    updateBudget: (state, action) => {
      const { totalBudget, categories } = action.payload;
      state.totalBudget = totalBudget;
      state.categories = categories;
    },
  },
});

export const { setBudget, updateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
