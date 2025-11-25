// src/redux/expenseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpense: 0,
  categoricalExpense: {
    food: 0,
    travel: 0,
    entertainment: 0,
    other: 0,
  },
};

const expenseSlice = createSlice({
  name: "expenses", // make sure this matches test expectations
  initialState,
  reducers: {
    updateTotalExpense: (state, action) => {
      state.totalExpense = action.payload; // numeric total spent
    },
    updateCategoricalExpense: (state, action) => {
      const { category, amount } = action.payload;
      state.categoricalExpense[category] += amount; // increment/decrement
    },
    resetAllExpense: () => initialState,
  },
});

export const {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
